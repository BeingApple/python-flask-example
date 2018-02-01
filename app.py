from flask import Flask
from flask import url_for
from flask import redirect
from flask import render_template
from flask import request
from database import db
from entities.user import User


app = Flask(__name__)


@app.route("/")
def index():
    return redirect(url_for('branch_form'))


@app.route("/branch_form/", methods=[ 'GET','POST'])
def branch_form():
    if request.method == 'POST':
        _object = User(username=request.form['userName'], number=request.form['phone1'])
        db.session.add(_object)
        db.session.commit()

        return render_template("branchform.html")
    else:
        return render_template("branchform.html")


@app.route("/test1/")
def test1():
    return render_template("extends_test1.html")


@app.route("/test2/")
def test2():
    return render_template("extends_test2.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0')
