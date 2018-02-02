from database import db


class User(db.Model):
    __tablename__ = 'TBL_TEST'
    SEQ = db.Column(db.Integer, primary_key=True)
    USERNAME = db.Column(db.String(80), nullable=False)
    NUMBER = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.USERNAME
