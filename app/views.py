# Flask views
from flask import render_template, jsonify, request
import time
import datetime
import sys

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

    # We also need to pass a report ID arg
    # Write to db
    # Return timestamp maybe?

    return jsonify(result=linetext)

@app.route('/_get_all_reports')
def get_all_reports():
    reports = Report.query.all()

    return jsonify(result=[r.serialize() for r in reports])

@app.route('/_get_report_lines')
def get_report_lines():
    reportID = request.args.get('reportid', -1, type=int)
    if(reportID == -1):
        errLine = ReportLine(LineID=-1, ReportID=-1, Timestamp='0000-00-00 00:00:00', LineText='Could not retrieve ReportLines - invalid report ID')
        return jsonify(result=errLine.serialize())

    reportLines = ReportLine.query.filter(ReportLine.ReportID == reportID);

    return jsonify(result=[rl.serialize() for rl in reportLines])


@app.route('/_new_report')
def new_report():
    rawTime = time.time()
    startDate = datetime.datetime.fromtimestamp(rawTime).strftime('%Y-%m-%d %H:%M:%S')
    substance = request.args.get('substance', "null", type=str)
    dosage = request.args.get('dosage', 0, type=int)
    dosagelabel = request.args.get('dosagelabel', "null", type=str)
    roa = request.args.get('roa', "null", type=str)
    source = request.args.get('source', "null", type=str)

    tester = startDate + substance + str(dosage) + roa + dosagelabel + source

    newReport = Report(StartDate=startDate, Substance=substance, Dosage=dosage, DosageLabel=dosagelabel, ROA=roa, Source=source)
    db.session.add(newReport)
    db.session.commit()

    #print("ID pulled from object: " + str(newReport.id), file=sys.stderr)

    return jsonify(result=newReport.serialize())
