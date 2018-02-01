from database import db


class User(db.Model):
    __tablename__ = 'TBL_TEST'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    number = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username