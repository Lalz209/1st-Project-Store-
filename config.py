import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'supersecretkey'
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or \
        f"sqlite:///{os.path.join(BASE_DIR, 'instance/store.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración CORS
    CORS_HEADERS = 'Content-Type'