# Flask views
from flask import render_template

from app import app, db
from app import models
from app.models import Report, ReportLine

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/database')
def database():
    return render_template("mockup.html")#Report.query.all()[0].Substance
