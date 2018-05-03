# Flask views
from flask import render_template, jsonify, request
import time
import datetime

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

@app.route('/_test')
def test():
    linetext = request.args.get('linetext', "null", type=str)
    #linetext = linetext + " boo!
    return jsonify(result=linetext)

@app.route('/_new_report')
def new_report():
    rawTime = time.time()
    startDate = datetime.datetime.fromtimestamp(rawTime).strftime('%Y-%m-%d %H:%M:%S')
    substance = request.args.get('substance', "null", type=str)
    dosage = request.args.get('dosage', 0, type=int)
    dosagelabel = request.args.get('dosagelabel', "null", type=str)
    source = request.args.get('source', "null", type=str)

    tester = startDate + substance + str(dosage) + dosagelabel + source

    newReport = Report(StartDate=startDate, Substance=substance, Dosage=dosage, DosageLabel=dosagelabel, Source=source)
    db.session.add(newReport)
    db.session.commit()

    return jsonify(result=tester)
