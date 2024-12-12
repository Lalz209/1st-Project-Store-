import os
from app import create_app, db
from app.models import Game

app = create_app()

with app.app_context():
    games = Game.query.all()
    for game in games:     
        game.image_url = os.path.basename(game.image_url)     
        db.session.commit()
