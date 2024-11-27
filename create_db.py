import os
from app import create_app, db


if not os.path.exists('instance'):
    os.makedirs('instance')

app = create_app()

with app.app_context():
    
    print("SQLALCHEMY_DATABASE_URI:", app.config['SQLALCHEMY_DATABASE_URI'])

   
    try:
        db.create_all()
        print("Database created successfully")
    except Exception as e:
        print("Error while creating the database:", e)
