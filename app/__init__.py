from flask import Flask
from .models import db
from .auth import auth  
from .main import main  

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/store.db'

    #register blueprints
    app.register_blueprint(main)  
    app.register_blueprint(auth)  

    return app
