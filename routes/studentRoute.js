import express from "express";
import { createStudent, deleteStudent, getAllStudents, getIndividualStudent, updateStudent } from "../controllers/studentController.js";
const router = express.Router();

router.post("/createStudent", createStudent);
router.get("/getAllStudents", getAllStudents);
router.get("/getIndividualStudent", getIndividualStudent);
router.patch("/updateStudent", updateStudent);
router.delete("/deleteStudent", deleteStudent);

export default router;
