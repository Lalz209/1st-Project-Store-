# Critics
#### Video Demo:  https://youtu.be/SYU4w1kJy4o
#### Description: It's a webpage that has the features to upload games, and see information about different games, you can log in, there is a hash encode for the passwords for security. The webpage is also responsive. You can upload the games, with some tools that makes the process easy. I want to add a lot of features, but due the endline, I delivered it like that. It was created with Flask, HTML, CSS, and JavaScript. I used the Flask-SQLAlchemy for the database, it is connected by axios, there is also blueprints and some technology's like crypt for the passwords. I took me quite long due I had to study some react, and come other things, and that's why I was not able to add all the features, but I think for now it's ok due it has some features.

Description of the files.

/app contains the endpoints, the models.py for the database. Auth.py is for the log in, log out, and register, and it also creates tokens for the session. The is also some features I need to add in future. The is also __init__.py that helps to initialize the app, and utils.py that only helps to verify emails.
/fronted is react there are all the pages, and styles with css. There is also App.js Where I used routes to connect the webpage. Game.js is to renderize the games info with the database. Home shows all the games, login to login, etc. And upload game to upload games. There is also a folder called components, where I have the components for the webpage like the navbar, and the footer, that is not finished yet.
/and in the principal folder are app.py to inicialize flask, and config.py to configure the database, the upload folder, etc. 
