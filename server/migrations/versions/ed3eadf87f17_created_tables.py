"""created tables

Revision ID: ed3eadf87f17
Revises: 
Create Date: 2024-02-15 15:10:27.874810

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed3eadf87f17'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('employees',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('department', sa.String(length=255), nullable=False),
    sa.Column('position', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('attendance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('hours_worked', sa.Float(), nullable=False),
    sa.Column('leave_taken', sa.Boolean(), nullable=True),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payrolls',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('month', sa.Integer(), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('total_hours_worked', sa.Float(), nullable=False),
    sa.Column('hourly_rate', sa.Float(), nullable=False),
    sa.Column('leave_deduction_rate', sa.Float(), nullable=False),
    sa.Column('bonus_rate', sa.Float(), nullable=False),
    sa.Column('tax_deduction_rate', sa.Float(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('salaries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('calculated_salary', sa.Float(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('salaries')
    op.drop_table('payrolls')
    op.drop_table('attendance')
    op.drop_table('employees')
    # ### end Alembic commands ###
