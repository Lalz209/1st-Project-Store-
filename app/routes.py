from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app, jsonify
from werkzeug.security import generate_password_hash
from app.models import db, User  
from .utils import is_valid_email

main = Blueprint('main', __name__)

@main.route('/', methods=["GET", "POST"]) 
def index():
    if request.method == "POST":
        
        return 

    
    return render_template('index.html')

@main.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')


@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        if not username or not email or not password or not confirm_password:
            return jsonify({"error": "All fields are required!"}), 400
    
    
        if password != confirm_password:
            return jsonify({"error": "Passwords do not match!"}), 400

        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            flash("e-mail is already in use!")
            return redirect(url_for('main.register'))
        
        if not is_valid_email(email):
             flash("e-mail is not valid. Please try with another e-mail.")
             return redirect(url_for("main.register"))
        

        new_user = User(
            username=username,
            email=email,
            password_hash = generate_password_hash(password, method='pbkdf2:sha256')
        )

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash("User id already exist! Try another one")
            
            return redirect(url_for('main.register'))

        

        db.session.add(new_user)
        db.session.commit()

        flash("account created successfully! Please log in.")
        return redirect(url_for('main.login'))
    

    return render_template('register.html')