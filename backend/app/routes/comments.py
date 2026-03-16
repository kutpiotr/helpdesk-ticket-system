from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.comment import Comment
from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentResponse

router = APIRouter(prefix="/tickets", tags=["Comments"])


@router.post("/{ticket_id}/comments", response_model=CommentResponse)
def create_comment(ticket_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
 ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
 if not ticket:
  raise HTTPException(status_code=404, detail="Ticket not found")

 author = db.query(User).filter(User.id == comment.author_id).first()
 if not author:
  raise HTTPException(status_code=404, detail="Author not found")
 if author.role != "admin":
  raise HTTPException(status_code=403, detail="Only admin can add comments")

 db_comment = Comment(
  content=comment.content,
  ticket_id=ticket_id,
  author_id=comment.author_id
 )
 db.add(db_comment)
 db.commit()
 db.refresh(db_comment)
 return db_comment


@router.get("/{ticket_id}/comments", response_model=list[CommentResponse])
def get_ticket_comments(ticket_id: int, db: Session = Depends(get_db)):
 ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
 if not ticket:
  raise HTTPException(status_code=404, detail="Ticket not found")

 comments = db.query(Comment).filter(Comment.ticket_id == ticket_id).all()
 return comments