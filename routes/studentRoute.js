import express from "express";
import { createStudent, getAllStudents, getIndividualStudent } from "../controllers/studentController.js";
const router = express.Router();

router.post("/createStudent", createStudent);
router.get("/getAllStudents", getAllStudents);
router.get("/getIndividualStudent", getIndividualStudent);

export default router;
