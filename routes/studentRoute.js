import express from "express";
import { createStudent, getAllStudents } from "../controllers/studentController.js";
const router = express.Router();

router.post("/createStudent", createStudent);
router.get("/getAllStudents", getAllStudents);

export default router;
