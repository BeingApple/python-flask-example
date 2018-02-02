from flask_sqlalchemy import SQLAlchemy
from project.create_app import get_app

app = get_app()
app.config.from_object('config.database_config')

db = SQLAlchemy(app)
