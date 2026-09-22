from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Note: Make sure your imports for database and models match your actual file names
from app.database import get_db, engine
from app.models import Base, Student
from app.schema import StudentCreate
app = FastAPI()

# --- CORS SETUP ---
# Yeh React frontend (localhost:5173) ko backend se connect hone deta hai
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
#                API ROUTES
# ==========================================

# 1. GET ALL STUDENTS (Dashboard aur Table ke liye)
@app.get("/students")
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students


# 2. CREATE STUDENT (Naya student add karne ke liye)
@app.post("/students")
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    new_student = Student(
        name=student.name, 
        email=student.email, 
        age=student.age
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return {"status": "Success", "message": "Student added successfully ✅", "student": new_student}


# 3. UPDATE STUDENT (Aapka naya edit route)
@app.put("/students/{student_id}")
def update_student(student_id: int, updated_student: StudentCreate, db: Session = Depends(get_db)):
    # Database me check karo ki student exist karta hai ya nahi
    student = db.query(Student).filter(Student.id == student_id).first()
    
    if not student:
        raise HTTPException(status_code=404, detail="Student not found ❌")
    
    # Nayi values ko purani values se replace karo
    student.name = updated_student.name
    student.email = updated_student.email
    student.age = updated_student.age
    
    # Database me save karo
    db.commit()
    db.refresh(student)
    
    return {"status": "Success", "message": "Student updated successfully ✅", "student": student}


# 4. DELETE STUDENT (Student ko database se hatane ke liye)
@app.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    
    if not student:
        raise HTTPException(status_code=404, detail="Student not found ❌")
        
    db.delete(student)
    db.commit()
    return {"status": "Success", "message": "Student deleted successfully 🗑️"}