from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api,Resource
from werkzeug.exceptions import NotFound
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import func





from models import db, User, Employee, Payroll, Attendance

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
CORS(app)

api = Api(app)

@app.errorhandler(NotFound)
def handle_not_found(e):
    response= make_response("NotFound: The requested resource not found", 404)
    return response

@app.route('/')
def home():
    return "Payroll Management System"

class Employees(Resource):
    def get(self):
        response_dict= [n.to_dict() for n in Employee.query.all()]
        response= make_response(jsonify(response_dict), 200)
        return  response

    def post(self):
        try: 
            # Get Json  data and add to database
            data= request.get_json()
            name = data.get('name')
            department = data.get('department')
            position = data.get('position')
            
            new_data= Employee(name=name,  department=department, position=position)  
            if not new_data:
                error_dict=  { "error":  "Missing name or department or position"}
                response= make_response(jsonify(error_dict), 404)
                return response
            else:
                db.session.add(new_data)
                db.session.commit()
                
                response_dict= new_data.to_dict()
                
                response= make_response(jsonify(response_dict), 201)
                return response
        
        except:
            error_dict={"errors": ["validation errors"]}
            response = make_response(jsonify(error_dict), 400)
            db.session.rollback ()
            return response

api.add_resource(Employees, '/employees')

class EmployeesByID(Resource):
    def get(self,id):
        record=  Employee.query.filter_by(id=id).first()
        record_dict= record.to_dict() if record else None
        
        if record_dict== None:
            error_dict=  {'error': 'Employee not found'}
            response= make_response(error_dict, 404)
            return response
        else:
            response= make_response(jsonify(record_dict), 200)
            return response
    
    def delete(self,id):
        res_id = Employee.query.get(id)
        if not res_id:
            return {"error": "Employee not found"}
        else:
            db.session.delete(res_id)
            db.session.commit()

            response = make_response(jsonify('Success: id deleted'))
            return response
        
api.add_resource(EmployeesByID, '/employees/<int:id>')

class Payrolls(Resource):
    def get(self):
        response_dict= [n.dict_() for n in Payroll.query.all()]
        response= make_response(jsonify(response_dict), 200)
        return  response
    
    @classmethod
    def post(cls):
        data = request.get_json()

        # Retrieve relevant data for calculation
        employee_id = data['employee_id']
        month = data['month']
        year = data['year']
        # tax_deduction_rate = data['tax_deduction_rate']

        # Validate that the provided month and year are not in the future
        current_month = datetime.now().month
        current_year = datetime.now().year

        if year > current_year or (year == current_year and month > current_month):
            return jsonify({'error': 'Invalid month and year'})

        daily_working_hours = 9

        # Fetch total worked hours for the specified month and year
        total_worked_hours = (
            db.session.query(func.sum(Attendance.hours_worked))
            .filter(Attendance.employee_id == employee_id, func.extract('month', Attendance.date) == month, func.extract('year', Attendance.date) == year)
            .scalar() or 0  # Use 0 if there are no records
        )

        # Retrieve the employee and payroll
        employee = Employee.query.filter_by(id=employee_id).first()
        payroll = Payroll.query.filter_by(employee_id=employee_id, month=month, year=year).first()

        # Validate constraints on rates
        if not (5 <= employee.payrolls[0].hourly_rate <= 10 and 3 <= employee.payrolls[0].leave_deduction_rate <= 5 and employee.payrolls[0].bonus_rate < 3 and 6 <= employee.payrolls[0].tax_deduction_rate <= 8):
            return jsonify({'error': 'Invalid rate constraints'})

        # Adjust hourly rate based on position
        if employee.position == 'Junior':
            employee.payrolls[0].hourly_rate *= 0.88  # Reduce by 12% for juniors

        # Calculate leave days for the month
        leave_days = (
            db.session.query(func.sum(Attendance.leave_taken))
            .filter(Attendance.employee_id == employee_id, func.extract('month', Attendance.date) == month, func.extract('year', Attendance.date) == year)
            .scalar() or 0  # Use 0 if there are no records
        )

        # Adjust total worked hours for leave days
        adjusted_total_worked_hours = total_worked_hours - (leave_days * daily_working_hours)

        # Calculate the salary
        calculated_salary = (
            adjusted_total_worked_hours * employee.payrolls[0].hourly_rate * (1 - employee.payrolls[0].leave_deduction_rate)
            + employee.payrolls[0].bonus_rate
            - (employee.payrolls[0].tax_deduction_rate / 100) * (adjusted_total_worked_hours * employee.payrolls[0].hourly_rate)
        )

        # Save the calculated salary in the Payroll table
        new_payroll = Payroll(
            employee_id=employee_id,
            month=month,
            year=year,
            total_hours_worked=adjusted_total_worked_hours,  
            # leave_taken=leave_days > 0,  # Check if leave was taken on any day
            hourly_rate=employee.payrolls[0].hourly_rate,
            leave_deduction_rate=employee.payrolls[0].leave_deduction_rate,
            bonus_rate=employee.payrolls[0].bonus_rate,
            calculated_salary=calculated_salary
        )

        db.session.add(new_payroll)
        db.session.commit()

        return jsonify({'message': 'Salary calculated and saved successfully'})

api.add_resource(Payrolls, '/payrolls')

class AttendanceResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            employee_id = data['employee_id']
            date_str = data['date']
            hours_worked = data['hours_worked']
            leave_taken = data.get('leave_taken', False)  # Default to False if not provided

            # Parse the date string into a datetime.date object
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            
            employee = Employee.query.filter_by(id=employee_id).first()

            # Validate if the employee exists
            if not employee:
                return jsonify({'error': f"Employee with ID {employee_id} does not exist."}), 404

            # Validate hours worked
            if hours_worked < 0 or hours_worked > 9:
                return jsonify({'error': "Invalid hours_worked. It should be between 0 and 9."}), 400
            
            # Validate date not to be after the current date
            current_date = datetime.now().date()

            # Compare the dates
            if date > current_date:
                return jsonify({'error': "Attendance date cannot be in the future"}), 400 

        
            new_attendance = Attendance(
                date=date,
                hours_worked=hours_worked,
                leave_taken=leave_taken,
                employee_id=employee_id
            )
            db.session.add(new_attendance)
            db.session.commit()
            
            response_dict = new_attendance.to_dict()
                
            response= make_response(jsonify(response_dict), 201)
            return response
        
        except:
            error_dict={"errors": ["validation errors"]}
            response = make_response(jsonify(error_dict), 400)
            db.session.rollback ()
            return response
        
        

api.add_resource(AttendanceResource, '/attendance')

if __name__ == '__main__':
    app.run(port=5555, debug=True)