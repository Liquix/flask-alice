from app import db

class Report(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    StartDate = db.Column(db.TIMESTAMP, nullable = False)
    Substance = db.Column(db.String(64), nullable = False)
    Dosage = db.Column(db.Float, nullable = False)
    DosageLabel = db.Column(db.String(16))
    ROA = db.Column(db.String(64))
    Source = db.Column(db.String(64))

    def __repr__(self):
        return '<Report {}>'.format(self.id)

    def serialize(self):
        return {
        'id': self.id,
        'start_date': self.StartDate,
        'substance': self.Substance,
        'dosage': self.Dosage,
        'dosage_label': self.DosageLabel,
        'roa': self.ROA,
        'source': self.Source
        }

class ReportLine(db.Model):
    LineID = db.Column(db.Integer, primary_key = True)
    ReportID = db.Column(db.Integer, db.ForeignKey('report.id', ondelete='CASCADE'), nullable = False)
    Timestamp = db.Column(db.TIMESTAMP, nullable = False)
    LineText = db.Column(db.String(512))

    report = db.relationship('Report', backref = db.backref('lines', lazy = True, passive_deletes=True))

    def __repr__(self):
        return '<ReportLine {}>'.format(self.LineText)

    def serialize(self):
        return {
        'lineid': self.LineID,
        'reportid': self.ReportID,
        'timestamp': self.Timestamp,
        'linetext': self.LineText
        }
