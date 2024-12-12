import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # upload files
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'app', 'static','uploads')
    # CORS configuration
    CORS_HEADERS = 'Content-Type'