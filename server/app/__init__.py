from flask import Flask
from .config import Config
from .extensions import db, jwt
from .seed import seed_categories
from .categories.routes import category_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Only allow your frontend for security
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5175"}})

    db.init_app(app)
    jwt.init_app(app)

    from .auth.routes import auth_bp
    from .expenses.routes import expense_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(expense_bp, url_prefix="/api/expenses")
    app.register_blueprint(category_bp)

    with app.app_context():
        # db.create_all()
        seed_categories()

    return app
