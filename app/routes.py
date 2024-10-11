from flask import Blueprint, render_template, jsonify, Flask

main = Blueprint('main', __name__)

@main.route('/', methods=["GET", "POST"]) 
def index():
    if request.method == "POST":
        
        return 

    
    return render_template('index.html')

@main.route('/login')
def login():
    return render_template('login.html')