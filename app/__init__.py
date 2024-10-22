from flask import Flask
from flask_sqlalchemy import SQLAlchemy  
from flask_cors import CORS
from .auth import auth
from .main import main
from .models import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object('config.Config')  # Load config from config.py

    db.init_app(app)
    
    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app
