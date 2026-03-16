from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Ticket(Base):
 __tablename__ = "tickets"

 id = Column(Integer, primary_key=True, index=True)
 title = Column(String(200), nullable=False)
 description = Column(Text, nullable=False)
 status = Column(String(20), nullable=False, default="open")
 created_at = Column(DateTime(timezone=True), server_default=func.now())
 updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
 user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

 user = relationship("User", back_populates="tickets")
 comments = relationship("Comment", back_populates="ticket", cascade="all, delete-orphan")