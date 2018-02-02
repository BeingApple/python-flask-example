from flask import Flask
from flask import url_for
from flask import redirect
from flask import render_template
from flask import request
from create_app import get_app
from database import db
from entities.user import User


app = get_app()


@app.route("/")
def index():
    return redirect(url_for('branch_form'))


@app.route("/branch_form/", methods=[ 'GET', 'POST'])
def branch_form():
    if request.method == 'POST':
        _object = User(USERNAME=request.form['userName'], NUMBER=request.form['phone1'])
        db.session.add(_object)
        db.session.commit()
    return render_template("branchform.html")


@app.route("/test1/")
def test1():
    return render_template("extends_test1.html")


@app.route("/test2/")
def test2():

    return render_template("extends_test2.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0')
