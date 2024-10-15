import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'supersecretkey'
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Esto da la ruta absoluta del directorio
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'instance/store.db')}"  # Ruta correcta a la base de datos
    SQLALCHEMY_TRACK_MODIFICATIONS = False