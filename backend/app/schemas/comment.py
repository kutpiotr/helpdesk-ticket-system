from datetime import datetime
from pydantic import BaseModel


class CommentBase(BaseModel):
 content: str


class CommentCreate(CommentBase):
 author_id: int


class CommentResponse(CommentBase):
 id: int
 created_at: datetime
 ticket_id: int
 author_id: int

 class Config:
  from_attributes = True