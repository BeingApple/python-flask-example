import pytest
from app import app


@pytest.fixture(scope='session')
def flask_app():
    app_context = app.app_context()
    app_context.push()

    yield app

    app_context.pop()


@pytest.fixture(scope='session')
def flask_client(flask_app):
    return flask_app.test_client()


