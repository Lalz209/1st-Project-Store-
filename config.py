import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'supersecretkey'
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Esto da la ruta absoluta del directorio
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'instance/store.db')}"  # route to data base
    SQLALCHEMY_TRACK_MODIFICATIONS = False