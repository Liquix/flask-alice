# Flask initialization file
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config = True)

from app import views

app.config.from_object('config')

# MySQL
MYSQL_SERVER    = 'localhost'
MYSQL_DATABASE  = 'TestDB'
MYSQL_USERNAME  = 'dev'
MYSQL_PASSWORD  = 'Smuckers123'
MYSQL_CONN      = 'mysql://' + MYSQL_USERNAME + ':' + MYSQL_PASSWORD + '@' + MYSQL_SERVER + '/' + MYSQL_DATABASE

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']    = False
app.config['SQLALCHEMY_DATABASE_URI']           = MYSQL_CONN

db = SQLAlchemy(app)

from app import models
