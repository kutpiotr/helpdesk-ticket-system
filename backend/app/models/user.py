from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class User(Base):
 __tablename__ = "users"

 id = Column(Integer, primary_key=True, index=True)
 name = Column(String(100), nullable=False)
 email = Column(String(255), unique=True, nullable=False, index=True)
 role = Column(String(20), nullable=False, default="user")
 created_at = Column(DateTime(timezone=True), server_default=func.now())

 tickets = relationship("Ticket", back_populates="user", cascade="all, delete-orphan")
 comments = relationship("Comment", back_populates="author", cascade="all, delete-orphan")