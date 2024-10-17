from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash
from app.models import User
from app import db
from app.utils import is_valid_email  

# Define blueprint auth
auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        # basic validations
        if not username or not email or not password or not confirm_password:
            flash("All fields are required!")
            return redirect(url_for('auth.register'))

        if password != confirm_password:
            flash("Passwords do not match!")
            return redirect(url_for('auth.register'))

        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            flash("Email is already in use!")
            return redirect(url_for('auth.register'))

        if not is_valid_email(email):
            flash("Invalid email format!")
            return redirect(url_for('auth.register'))

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash("Username already exists!")
            return redirect(url_for('auth.register'))

        # create new user
        new_user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password, method='pbkdf2:sha256')
        )
        db.session.add(new_user)
        db.session.commit()

        flash("Account created successfully!")
        return redirect(url_for('auth.login'))  #redirect to login after account created

    return render_template('register.html')

@auth.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')
