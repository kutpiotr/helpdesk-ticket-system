from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
 existing_user = db.query(User).filter(User.email == user.email).first()
 if existing_user:
  raise HTTPException(status_code=400, detail="Email already registered")

 db_user = User(
  name=user.name,
  email=user.email,
  role=user.role
 )
 db.add(db_user)
 db.commit()
 db.refresh(db_user)
 return db_user


@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
 users = db.query(User).all()
 return users


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
 user = db.query(User).filter(User.id == user_id).first()
 if not user:
  raise HTTPException(status_code=404, detail="User not found")
 return user