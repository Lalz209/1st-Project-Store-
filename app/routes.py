from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash
from app.models import db, User  
from flask import current_app
from .utils import is_valid_email

main = Blueprint('main', __name__)

@main.route('/', methods=["GET", "POST"]) 
def index():
    if request.method == "POST":
        
        return 

    
    return render_template('index.html')

@main.route('/login')
def login():
    return render_template('login.html')


@main.route('/register')
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        if password != confirm_password:
            flash("password do not match.")
            return redirect(url_for("auth.register"))

        existing_email = user.query.filter_by(email=email).first()
        if existing_email:
            flash("e-mail is already in use!")
            return redirect(url_for('auth.register'))
        
        if not is_valid_email(email):
            return flash("e-mail is not valid. Please try with another e-mail.")
        

        new_user = user(
            username=username,
            email=email,
            password_hash = generate_password_hash(password, method='sha256')
        )

        existing_user = user.query.filter_by(username=username).first()
        if existing_user:
            flash("User id already exist! Try another one")
            
            return redirect(url_for('auth.register'))

        

        db.session.add(new_user)
        db.session.commit()

        flash("account created successfully! Please log in.")
        return redirect(url_for('auth.login'))

    return render_template('register.html')