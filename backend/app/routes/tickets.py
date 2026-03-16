from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketDetailResponse, TicketResponse, TicketStatusUpdate, TicketUpdate

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.post("/", response_model=TicketResponse)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
 user = db.query(User).filter(User.id == ticket.user_id).first()
 if not user:
  raise HTTPException(status_code=404, detail="User not found")

 db_ticket = Ticket(
  title=ticket.title,
  description=ticket.description,
  status="open",
  user_id=ticket.user_id
 )
 db.add(db_ticket)
 db.commit()
 db.refresh(db_ticket)
 return db_ticket


@router.get("/", response_model=list[TicketResponse])
def get_tickets(db: Session = Depends(get_db)):
 tickets = db.query(Ticket).all()
 return tickets


@router.get("/{ticket_id}", response_model=TicketDetailResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
 ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
 if not ticket:
  raise HTTPException(status_code=404, detail="Ticket not found")
 return ticket


@router.put("/{ticket_id}", response_model=TicketResponse)
def update_ticket(ticket_id: int, ticket_data: TicketUpdate, db: Session = Depends(get_db)):
 ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
 if not ticket:
  raise HTTPException(status_code=404, detail="Ticket not found")

 user = db.query(User).filter(User.id == ticket_data.user_id).first()
 if not user:
  raise HTTPException(status_code=404, detail="User not found")

 ticket.title = ticket_data.title
 ticket.description = ticket_data.description
 ticket.status = ticket_data.status
 ticket.user_id = ticket_data.user_id

 db.commit()
 db.refresh(ticket)
 return ticket


@router.patch("/{ticket_id}/status", response_model=TicketResponse)
def update_ticket_status(
 ticket_id: int,
 status_data: TicketStatusUpdate,
 admin_id: int,
 db: Session = Depends(get_db)
):
 admin = db.query(User).filter(User.id == admin_id).first()
 if not admin:
  raise HTTPException(status_code=404, detail="Admin user not found")
 if admin.role != "admin":
  raise HTTPException(status_code=403, detail="Only admin can change ticket status")

 ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
 if not ticket:
  raise HTTPException(status_code=404, detail="Ticket not found")

 allowed_statuses = ["open", "in_progress", "closed"]
 if status_data.status not in allowed_statuses:
  raise HTTPException(status_code=400, detail="Invalid status")

 ticket.status = status_data.status
 db.commit()
 db.refresh(ticket)
 return ticket


@router.delete("/{ticket_id}")
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
 ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
 if not ticket:
  raise HTTPException(status_code=404, detail="Ticket not found")

 db.delete(ticket)
 db.commit()
 return {"message": f"Ticket {ticket_id} deleted successfully"}