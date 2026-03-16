from datetime import datetime
from pydantic import BaseModel

from app.schemas.comment import CommentResponse


class TicketBase(BaseModel):
 title: str
 description: str


class TicketCreate(TicketBase):
 user_id: int


class TicketUpdate(BaseModel):
 title: str
 description: str
 status: str
 user_id: int


class TicketStatusUpdate(BaseModel):
 status: str


class TicketResponse(TicketBase):
 id: int
 status: str
 created_at: datetime
 updated_at: datetime | None
 user_id: int

 class Config:
  from_attributes = True


class TicketDetailResponse(TicketResponse):
 comments: list[CommentResponse] = []