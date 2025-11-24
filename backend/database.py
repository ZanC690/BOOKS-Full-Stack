import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# ============================================================
# Load Environment Variables from .env file
# ============================================================
load_dotenv()

# ============================================================
# PostgreSQL Connection Details
# ============================================================
DB_USER = os.getenv("DB_USER")
DB_PASSWORD= os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# ============================================================
# Database URL
# ============================================================
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    DATABASE_URL,
    pool_size=5, #sets the number of connections to keep open in the pool.
    max_overflow=10, #create 10 additional temporary connections, handling sudden spikes
    pool_timeout=30, #raises an exception if connection can't be obtained within 30s, preventing hanging indefinitely
    pool_recycle=1800, #recycles connection after 1800s(30mins), ensuring no stale connection
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


