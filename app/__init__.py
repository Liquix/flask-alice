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

# This should really go in a separate models.py file
class Report(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    StartDate = db.Column(db.TIMESTAMP, nullable = False)
    Substance = db.Column(db.String(64), nullable = False)
    Dosage = db.Column(db.Float, nullable = False)
    DosageLabel = db.Column(db.String(16))
    Source = db.Column(db.String(64))

    def __repr__(self):
        return '<Report {}>'.format(self.id)

class ReportLine(db.Model):
    LineID = db.Column(db.Integer, primary_key = True)
    ReportID = db.Column(db.Integer, db.ForeignKey('report.id'), nullable = False)
    Timestamp = db.Column(db.TIMESTAMP, nullable = False)
    LineText = db.Column(db.String(512))

    report = db.relationship('Report', backref = db.backref('lines', lazy = True))
