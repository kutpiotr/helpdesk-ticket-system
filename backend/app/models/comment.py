from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Comment(Base):
 __tablename__ = "comments"

 id = Column(Integer, primary_key=True, index=True)
 content = Column(Text, nullable=False)
 created_at = Column(DateTime(timezone=True), server_default=func.now())
 ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=False)
 author_id = Column(Integer, ForeignKey("users.id"), nullable=False)

 ticket = relationship("Ticket", back_populates="comments")
 author = relationship("User", back_populates="comments")