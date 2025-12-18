from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()


@jwt.invalid_token_loader
def invalid_token_callback(reason):
    print("Invalid token:", reason)
    return jsonify({"msg": "Invalid token"}), 422

@jwt.unauthorized_loader
def missing_token_callback(reason):
    print("Missing token:", reason)
    return jsonify({"msg": "Missing token"}), 401
