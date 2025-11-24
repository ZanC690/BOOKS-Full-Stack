from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Numeric

class Books(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    published_year = Column(Integer)
    is_available = Column(Boolean, default=True)
    price = Column(Numeric(precision=10, scale=2))
    