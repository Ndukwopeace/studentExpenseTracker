from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Expense, Category
from ..extensions import db
from datetime import datetime

expense_bp = Blueprint("expenses", __name__)

@expense_bp.route("/", methods=["POST"])
@jwt_required()
def create_expense():
    user_id = get_jwt_identity()
    data = request.get_json()
    print("Expense POST data:", data)

    category = Category.query.filter(
        Category.id == data.get("category_id"),
        (Category.is_system == True) | (Category.user_id == user_id)
    ).first()

    if not category:
        return jsonify({"error": "Invalid category"}), 400

    expense = Expense(
        description=data.get("description"),
        amount=data.get("amount"),
        date=datetime.strptime(data.get("date"), "%Y-%m-%d"),
        category_id=category.id,
        user_id=user_id
    )

    db.session.add(expense)
    db.session.commit()

    return jsonify({
        "id": expense.id,
        "description": expense.description,
        "amount": expense.amount,
        "date": expense.date,
        "category": {
            "id": expense.category.id,
            "name": expense.category.name,
            "emoji": expense.category.emoji
        }
    }), 201


@expense_bp.route("/", methods=["GET"])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": e.id,
            "description": e.description,
            "amount": e.amount,
            "category": {
                "id": e.category.id,
                "name": e.category.name,
                "emoji": e.category.emoji
            },
            "date": e.date.isoformat()
        } for e in expenses
    ])


@expense_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_expense(id):
    user_id = get_jwt_identity()
    expense = Expense.query.filter_by(id=id, user_id=user_id).first_or_404()
    data = request.get_json()

    expense.description = data.get("description", expense.description)
    expense.amount = data.get("amount", expense.amount)

    db.session.commit()
    return jsonify({"message": "Expense updated"})


@expense_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_expense(id):
    user_id = get_jwt_identity()
    expense = Expense.query.filter_by(id=id, user_id=user_id).first_or_404()

    db.session.delete(expense)
    db.session.commit()
    return jsonify({"message": "Expense deleted"})
