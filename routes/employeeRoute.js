import express from "express";
import { createEmployee, getAllEmployees } from "../controllers/employeeController.js";
const router = express.Router();

router.post("/createEmployee", createEmployee);
router.get("/getAllEmployees", getAllEmployees)

export default router;
