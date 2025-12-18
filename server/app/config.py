import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret")
    # SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://postgres.ahgmfwijvpnijbajkkow:PH9ZDluxe6sRs8C6@aws-1-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require"