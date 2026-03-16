from fastapi import FastAPI
from app.routes.health import router as health_router

app = FastAPI(
title="Helpdesk Ticket System API",
description="Backend API for helpdesk ticket management system.",
version="1.0.0"
)

app.include_router(health_router)

@app.get("/")
def read_root():
 return {"message": "Helpdesk Ticket System API is running"}