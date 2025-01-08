from flask_login import UserMixin
from . import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'user'  
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=True)
    developers = db.Column(db.String(255), nullable=True)
    publishers = db.Column(db.String(255), nullable=True)
    genres = db.Column(db.String(255), nullable=True)
    multiplayer_modes = db.Column(db.String(255), nullable=True)
    platforms = db.Column(db.String(255), nullable=True)
    crossplay = db.Column(db.Boolean, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)