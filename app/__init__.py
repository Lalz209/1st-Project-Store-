from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Inicializar SQLAlchemy para la base de datos
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configuración de la base de datos 
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mi_tienda.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar la base de datos con la aplicación
    db.init_app(app)

    # Registrar las rutas desde routes.py
    from .routes import main
    app.register_blueprint(main)

    return app