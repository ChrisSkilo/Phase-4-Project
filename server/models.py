from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import CheckConstraint
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()




           #Employee Models

class Employee(db.Model, SerializerMixin):
    __tablename__ = 'employees'

    serialize_rules = ('-payrolls.employee', '-attendances.employee')
   
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    
    payrolls = db.relationship('Payroll', backref='employee', lazy=True)
    attendances = db.relationship('Attendance', backref='employee', lazy=True)
    
    _table_args__ = (
        CheckConstraint(
            "position IN ('Junior', 'Senior')",
            name='check_category'
        ),
    )
    
    
        
    
        
        # PAYROLL MODELS

class Payroll(db.Model, SerializerMixin):
    __tablename__ =  'payrolls'

    serialize_rules = ('-employee.payrolls', '-employee.attendances')

    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    total_hours_worked = db.Column(db.Float, nullable=False)
    hourly_rate = db.Column(db.Float, CheckConstraint('hourly_rate >= 50 AND hourly_rate <= 100'), nullable=False)
    leave_deduction_rate = db.Column(db.Float, CheckConstraint('leave_deduction_rate >= 3 AND leave_deduction_rate <= 5'), nullable=False)
    bonus_rate = db.Column(db.Float, CheckConstraint('bonus_rate < 3'), nullable=False)
    tax_deduction_rate = db.Column(db.Float, CheckConstraint('tax_deduction_rate >= 6 AND tax_deduction_rate <= 8'), default=0.0, nullable=False)
    

    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    
    #validations

    @validates('employee_id')
    def validate_employee_id(self, key, employee_id):
        employee = Employee.query.get(employee_id)
        if not employee:
            raise ValueError(f"Employee with ID {employee_id} does not exist.")
        return employee_id

  
      
      
      
      
      # ATTENDANCE MODELS

class Attendance(db.Model, SerializerMixin):
    __tablename__ =  'attendance'
    
    serialize_rules = ('-employee.payrolls', '-employee.attendances')

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    hours_worked = db.Column(db.Float, nullable=False)
    leave_taken = db.Column(db.Boolean, default=False)

    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)

    
    #validations
    @validates('employee_id')
    def validate_employee_id(self, key, employee_id):
        employee = Employee.query.get(employee_id)
        if not employee:
            raise ValueError(f"Employee with ID {employee_id} does not exist.")
        return employee_id
    
    @validates('hours_worked')
    def validate_hours_worked(self, key, hours_worked):
        hours_worked_int = int(hours_worked)

        if hours_worked_int < 0 or hours_worked_int > 9:
            raise ValueError("Invalid hours_worked. It should be between 0 and 9.")

        return hours_worked_int



    # def serialize(self):
    #     return {
    #         'id':self.id,
    #         'date': self.date,
    #         'hours_worked': self.hours_worked,
    #         'leave_taken': self.leave_taken,
    #         'employee_id': self.employee_id
    #     }


           #SALARY MODEL 
class Salary(db.Model, SerializerMixin):
    __tablename__ = 'salaries'

    serialize_rules = ('-employee.salaries', '-employee.payrolls', '-employee.attendances')

    id = db.Column(db.Integer, primary_key=True)
    calculated_salary = db.Column(db.Float, nullable=False)

    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    employee = db.relationship('Employee', backref='salaries', lazy=True)

    @validates('employee_id')
    def validate_employee_id(self, key, employee_id):
        employee = Employee.query.get(employee_id)
        if not employee:
            raise ValueError(f"Employee with ID {employee_id} does not exist.")
        return employee_id