from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Category
from ..extensions import db

category_bp = Blueprint("categories", __name__, url_prefix="/api/categories")

# Handle preflight OPTIONS requests for CORS
@category_bp.before_request
def handle_options():
    if request.method == "OPTIONS":
        return "", 200

@category_bp.route("/", methods=["POST"], strict_slashes=False)
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    data = request.get_json()

    name = data.get("name", "").strip()
    emoji = data.get("emoji")

    if not name:
        return jsonify({"error": "Category name is required"}), 400

    if emoji and len(emoji) > 5:
        return jsonify({"error": "Invalid emoji"}), 400

    exists = Category.query.filter(
        Category.name == name,
        (Category.is_system == True) | (Category.user_id == user_id)
    ).first()

    if exists:
        return jsonify({"error": "Category already exists"}), 409

    category = Category(
        name=name,
        emoji=emoji,
        user_id=user_id,
        is_system=False
    )

    db.session.add(category)
    db.session.commit()

    return jsonify({"message": "Category created"}), 201

@category_bp.route("/", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()

    categories = Category.query.filter(
        (Category.is_system == True) | (Category.user_id == user_id)
    ).all()

    result = [
        {
            "id": category.id,
            "name": category.name,
            "emoji": category.emoji,
            "is_system": category.is_system
        }
        for category in categories
    ]

    return jsonify(result), 200
