from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# initialize SQLAlchemy to the data base
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # configure data base
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # initialize date base on application
    db.init_app(app)

    # register routes from app.py
    from .routes import main
    app.register_blueprint(main)

    return app