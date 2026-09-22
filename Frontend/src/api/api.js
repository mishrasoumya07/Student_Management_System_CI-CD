import axios from "axios";

const API_URL = "http://3.104.58.160:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create Student
export const createStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to create student";
  }
};

// Get All Students
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch students";
  }
};

// Update Student (Naya function add kiya gaya hai)
export const updateStudent = async (studentID, studentData) => {
  try {
    const response = await api.put(`/students/${studentID}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to update student";
  }
};

// Delete Student
export const deleteStudent = async (studentID) => {
  try {
    const response = await api.delete(`/students/${studentID}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to delete student";
  }
};

export default api;