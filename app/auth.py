from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
from datetime import datetime, timedelta, timezone
import jwt
from functools import wraps
from .models import User
from . import db
from dotenv import load_dotenv

load_dotenv()

auth = Blueprint('auth', __name__)

# JWT Configuration
JWT_SECRET_KEY = 'SECRET_KEY'
ACCESS_TOKEN_EXPIRES = timedelta(days=1)  
REFRESH_TOKEN_EXPIRES = timedelta(days=30)  


def generate_token(user, expires_delta, token_type="access"):
    """Generate a JWT token (access or refresh)."""
    return jwt.encode(
        {
            "user_id": user.id,
            "type": token_type,
            "exp": datetime.now(tz=timezone.utc) + expires_delta,
        },
        JWT_SECRET_KEY,
        algorithm="HS256",
    )


def token_required(f):
    """Decorator to require a valid access token for certain routes."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            token = token.split()[1]  # Remove "Bearer" prefix
            data = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            if data["type"] != "access":
                raise jwt.InvalidTokenError()
            user = User.query.get(data["user_id"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except (jwt.InvalidTokenError, Exception):
            return jsonify({"error": "Invalid token"}), 401

        return f(user, *args, **kwargs)
    return decorated


@auth.route("/api/register", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def register():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    # Validation
    if not all([username, email, password, confirm_password]):
        return jsonify({"error": "All fields are required"}), 400
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400
    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return jsonify({"error": "Email or Username already exists"}), 400

    # Create new user
    new_user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password, method="pbkdf2:sha256"),
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Account created successfully!"}), 201


@auth.route("/api/login", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def login():
    data = request.get_json() 

    identifier = data.get("identifier") 
    password = data.get("password")

   
    user = User.query.filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()
    print("Found user:", user)  

    if not user or not check_password_hash(user.password_hash, password):
        print("Invalid credentials")  
        return jsonify({"error": "Invalid credentials"}), 401

   
    access_token = generate_token(user, ACCESS_TOKEN_EXPIRES, "access")
    refresh_token = generate_token(user, REFRESH_TOKEN_EXPIRES, "refresh")

    
    user.refresh_token = refresh_token
    db.session.commit()

    return jsonify(
        {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {"id": user.id, "username": user.username, "email": user.email},
        }
    )


@auth.route("/api/refresh", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
def refresh():
    refresh_token = request.json.get("refresh_token")
    if not refresh_token:
        return jsonify({"error": "Refresh token is required"}), 400

    try:
        data = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=["HS256"])
        if data["type"] != "refresh":
            raise jwt.InvalidTokenError()

        user = User.query.get(data["user_id"])
        if not user or user.refresh_token != refresh_token:
            return jsonify({"error": "Invalid refresh token"}), 401

        # Generate new tokens
        access_token = generate_token(user, ACCESS_TOKEN_EXPIRES, "access")
        new_refresh_token = generate_token(user, REFRESH_TOKEN_EXPIRES, "refresh")

        user.refresh_token = new_refresh_token
        db.session.commit()

        return jsonify({"access_token": access_token, "refresh_token": new_refresh_token})
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Refresh token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid refresh token"}), 401


@auth.route("/api/logout", methods=["POST"])
@cross_origin(origins="http://localhost:3000")
@token_required
def logout(current_user):
    current_user.refresh_token = None
    db.session.commit()
    return jsonify({"message": "Successfully logged out"}), 200
