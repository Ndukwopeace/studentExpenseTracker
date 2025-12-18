from app.models import Category
from .extensions import db

DEFAULT_CATEGORIES = [
    ("Food", "🍔"),
    ("Transport", "🚕"),
    ("Accommodation", "🏠"),
    ("Books", "📚"),
    ("Utilities", "💡"),
    ("Entertainment", "🎮"),
    ("Health", "💊"),
    ("Miscellaneous", "🧾")
]

def seed_categories():
    for name, emoji in DEFAULT_CATEGORIES:
        exists = Category.query.filter_by(
            name=name,
            is_system=True
        ).first()

        if not exists:
            db.session.add(
                Category(
                    name=name,
                    emoji=emoji,
                    is_system=True
                )
            )

    db.session.commit()
