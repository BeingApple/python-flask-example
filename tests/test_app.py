from flask import render_template_string


def test_branch_form(flask_client):
    resp = flask_client.get('/branch_form/')
    assert resp.status_code == 200


def test_branch_form_post(flask_client):
    data = {'userName' : 'TEST-USER-NAME', 'phone1' : '123456'}
    resp = flask_client.post('/branch_form/', data=data)
    assert resp.status_code == 200


def test_test1(flask_client):
    resp = flask_client.get('/test1/')
    assert resp.status_code == 200


def test_test2(flask_client):
    resp = flask_client.get('/test2/')
    assert resp.status_code == 200
