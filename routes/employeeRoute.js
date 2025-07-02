import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getIndividualEmployee,
  updateEmployeeDetails,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/createEmployee", createEmployee);
router.get("/getAllEmployees", getAllEmployees);
router.get("/getIndividualEmployee", getIndividualEmployee);
router.patch("/updateEmployeeDetails", updateEmployeeDetails);

export default router;
