from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import Base, engine
from app.models import Comment, Ticket, User
from app.routes.comments import router as comments_router
from app.routes.health import router as health_router
from app.routes.tickets import router as tickets_router
from app.routes.users import router as users_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
 title="Helpdesk Ticket System API",
 description="Backend API for helpdesk ticket management system.",
 version="1.0.0"
)

app.add_middleware(
 CORSMiddleware,
 allow_origins=["http://localhost:4200"],
 allow_credentials=True,
 allow_methods=["*"],
 allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(users_router)
app.include_router(tickets_router)
app.include_router(comments_router)

@app.get("/")
def read_root():
 return {"message": "Helpdesk Ticket System API is running"}