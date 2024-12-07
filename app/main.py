import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from app import db
from app.models import Game
from datetime import datetime 

main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main.route('/upload_game', methods=['POST'])
def upload_game():
    try:
        
        name = request.form['name']
        release_date = request.form['release_date']
        developers = ','.join(request.form.getlist('developers'))  
        publishers = ','.join(request.form.getlist('publishers'))
        genres = ','.join(request.form.getlist('genres'))
        multiplayer_modes = ','.join(request.form.getlist('multiplayer_modes'))
        platforms = ','.join(request.form.getlist('platforms'))
        crossplay = request.form.get('crossplay') == 'true'

        release_date = datetime.strptime(release_date, '%Y-%m-%d').date()
     
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400

        image = request.files['image']
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            image_path = os.path.join(upload_folder, filename)

            image.save(image_path)

            new_game = Game(
                name=name,
                release_date=release_date,
                developers=developers,
                publishers=publishers,
                genres=genres,
                multiplayer_modes=multiplayer_modes,
                platforms=platforms,
                crossplay=crossplay,
                image_url=image_path
            )

            db.session.add(new_game)
            db.session.commit()

            return jsonify({"message": "Game uploaded successfully!"}), 201
        else:
            return jsonify({"error": "Invalid image format"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to upload game"}), 500
    

@main.route('/games', methods=['GET'])
def get_games():
    try:
        page = int(request.args.get('page', 1))  # Página actual
        per_page = int(request.args.get('per_page', 6))  # Juegos por página
        
        # Ordenar por fecha de lanzamiento descendente
        games_query = Game.query.order_by(Game.release_date.desc())
        paginated_games = games_query.paginate(page=page, per_page=per_page, error_out=False)

        games = [
            {
                "id": game.id,
                "name": game.name,
                "release_date": game.release_date.strftime('%Y-%m-%d'),
                "image_url": game.image_url
            } for game in paginated_games.items
        ]

        return jsonify({
            "games": games,
            "total_pages": paginated_games.pages,
            "current_page": paginated_games.page
        })
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to fetch games"}), 500



