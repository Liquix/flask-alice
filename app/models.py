from app import db

# WE NEED AN ROA FIELD!!!
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
