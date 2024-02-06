from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    
    payrolls = db.relationship('Payroll', backref='employee', lazy=True)
    attendances = db.relationship('Attendance', backref='employee', lazy=True)
    

class Payroll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    hours_worked = db.Column(db.Float, nullable=False)
    leave_taken = db.Column(db.Boolean, default=False)
    hourly_rate = db.Column(db.Float, nullable=False)
    leave_deduction_rate = db.Column(db.Float, nullable=False)
    bonus_rate = db.Column(db.Float, nullable=False)
    tax_deduction_rate = db.Column(db.Float, nullable=False)
    calculated_salary = db.Column(db.Float, nullable=True)

    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    hours_worked = db.Column(db.Float, nullable=False)
    leave_taken = db.Column(db.Boolean, default=False)

    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)