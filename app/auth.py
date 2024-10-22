from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models import User, db
from app.utils import is_valid_email  

# Define blueprint auth
auth = Blueprint('auth', __name__)

@auth.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()  # Flask get data on JSON format from react

    # extract json data
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    # basic validations
    if not username or not email or not password or not confirm_password:
        return jsonify({"error": "All fields are required!"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match!"}), 400
    
    if len(password) < 8:
        return jsonify({"error": "password must be at least 8 characters"}) 

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"error": "Email is already in use!"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format!"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists!"}), 400

    # create new user
    new_user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password, method='pbkdf2:sha256')
    )
    db.session.add(new_user)
    db.session.commit()

    # return jsonify answer
    return jsonify({"message": "Account created successfully!"}), 201
