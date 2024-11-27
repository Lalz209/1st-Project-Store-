from flask import Blueprint
from flask_login import login_required, current_user
from flask_cors import cross_origin

main = Blueprint('main', __name__)

@main.route('/api/home', methods=['GET'])
@cross_origin(origins="http://localhost:3000")
def home():
    return jsonify({'message': 'Hello, World!'})
