from random import choice as rc

from faker import Faker

from app import app
from models import db, Employee, Payroll, Attendance


fake = Faker()

with app.app_context():

    Employee.query.delete()
    Payroll.query.delete()
    Attendance.query.delete()
    
    departments = ['Finance', 'Engineering', 'HR', 'IT', 'Marketing']

    employees = []
    for _ in range(10):  
        employee = Employee(
            name=fake.name(),
            department=rc(departments),
            position=rc(['Junior', 'Senior']),
        )
        db.session.add(employee)
        employees.append(employee)

    db.session.commit()

    # Create associated payroll records for each employee
    for employee in employees:
        payroll = Payroll(
            month=fake.random_int(min=1, max=12),
            year=fake.random_int(min=2022, max=2023),
            total_hours_worked=fake.random_int(min=1, max=40),
            hourly_rate=fake.random_int(min=5, max=10),
            leave_deduction_rate=fake.random_int(min=3, max=5),
            bonus_rate=fake.random_int(min=0, max=2),
            tax_deduction_rate=fake.random_int(min=6, max=8),
            employee=employee,
        )
        db.session.add(payroll)

    db.session.commit()

    # Create associated attendance records for each employee
    for employee in employees:
        attendance = Attendance(
            date=fake.date_this_year(),
            hours_worked=fake.random_int(min=0, max=9),
            leave_taken=fake.boolean(),
            employee=employee,
        )
        db.session.add(attendance)

    db.session.commit()