import Student from "../models/studentModel.js";
import mongoose from "mongoose";
// To create the student details in database. (POST)
export const createStudent = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send({ status: 400, msg: "Request body can not be empty..." });
    }
    if (!req.body.fName) {
      return res
        .status(400)
        .send({ status: 400, msg: "first name is required." });
    }
    if (!isNaN(req.body.fName || req.body.fName.trim())) {
      return res.status(400).send({ status: 400, msg: "Invalid Name." });
    }
    if (!req.body.lName) {
      return res
        .status(400)
        .send({ status: 400, msg: "last name is required." });
    }
    if (!isNaN(req.body.lName || req.body.lName.trim())) {
      return res.status(400).send({ status: 400, msg: "Invalid Name." });
    }
    if (!req.body.age) {
      return res.status(400).send({ status: 400, msg: "Age is required." });
    }
    if (typeof req.body.age != "number") {
      return res
        .status(400)
        .send({ status: 400, msg: "Age must be a number." });
    }
    if (!req.body.gender) {
      return res.status(400).send({ status: 400, msg: "Gender is required." });
    }
    if (typeof req.body.gender != "string") {
      return res.status(400).send({ status: 400, msg: "Gender is Invalid." });
    }
    req.body.gender = req.body.gender.trim();
    if (!["Male", "Female"].includes(req.body.gender)) {
      return res.status(400).send("Gender must be Male or Female.");
    }
    if (!req.body.mobile) {
      return res
        .status(400)
        .send({ status: 400, msg: "Mobile number is required." });
    }
    if (typeof req.body.mobile != "number") {
      return res
        .status(400)
        .send({ status: 400, msg: "Mobile number must be a number." });
    }
    const isNumExist = await Student.findOne({ mobile: req.body.mobile });
    if (isNumExist) {
      return res
        .status(400)
        .send({ status: 400, msg: "Use a different mobile number." });
    }
    if (!req.body.email) {
      return res
        .status(400)
        .send({ status: 400, msg: "email number is required." });
    }
    if (typeof req.body.email != "string") {
      return res
        .status(400)
        .send({ status: 400, msg: "email number must be a string." });
    }
    const isMailExist = await Student.findOne({ email: req.body.email });
    if (isMailExist) {
      return res
        .status(400)
        .send({ status: 400, msg: "Use a different email." });
    }
    const savedata = await Student.create(req.body);
    return res.status(201).send({
      status: 201,
      msg: "Student created successfully...",
      data: savedata,
    });
  } catch {
    res.status(500).send({ status: 500, msg: "Internal Server Error." });
  }
};

// To fetch all the documents based on the filter and pagination functionality. (GET)
export const getAllStudents = async (req, res) => {
  try {
    // Destructuring the request query
    let { fName, age, page = 1, limit = 2 } = req.query;

    // validation
    if (isNaN(page) || page == 0) {
      return res
        .status(400)
        .send({ status: 400, msg: "Page must be a no and greater than 0" });
    }
    if (isNaN(limit) || limit == 0) {
      return res
        .status(400)
        .send({ status: 400, msg: "Limit must be a no and greater than 0" });
    }
    // validation

    page = +page ? +page : 1; // Ternary Operator condition ? true (Ist) : false(IInd)
    limit = +limit ? +limit : 2; // Ternary Operator condition ? true (Ist) : false(IInd)
    let skip = (+page - 1) * +limit; // (1-1)*5 = 0*5 = 0

    // Filter formation
    let filter = {};

    if (fName) {
      filter.fName = fName;
    }
    if (age) {
      filter.age = age;
    }
    // Filter formation

    // const getStudents = await Student.findOne(filter); // findOne query returns data in object. If no data found then it returns null.
    const getStudents = await Student.find(filter) // here we are fetching data from database.
      .select({ _id: 1, fname: 1, lname: 1 }) // here we are selecting particular fields from database
      .limit(+limit) // here we are applying limit on no of documents
      .skip(skip) // here we are skipping the documents based on the page no provided.
      .sort({ _id: -1 }); // here we are sorting the documents based on the _id field in Descending Order.

    // Note:  find query returns data in array. If no data found then it returns an empty array.
    const total = await Student.countDocuments(filter); // here we are counting the documents based on the filter applied.
    return res.status(200).send({
      status: 200,
      msg: "List of all students",
      data: getStudents,
      count: total,
    }); // no of doc/limit per
  } catch (err) {
    return res.status(500).send({ status: 500, msg: err });
  }
};

// To fetch the particular document details based on the _id field (GET)
export const getIndividualStudent = async (req, res) => {
  try {
    const { _id } = req.query;

    // validation
    if (!_id)
      return res.status(400).send({ status: 400, msg: "_id is required" });

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).send({ status: 400, msg: "Invalid ObjectId" });
    // validation

    // const getStudent = await Student.findOne({ _id: _id }); // this will fetch the particular document. If it finds then return in the form of an object. Otherwise will return null

    // const getStudent = await Student.find({ _id: _id }); // this will fetch the particular document. If it finds then return in the form of an array of object. Otherwise will return empty array like this []

    const getStudent = await Student.findById(_id); // fetch the particular document based on the _id. If it finds then return in the form of an object. Otherwise will return null
    
    return res.status(200).json({
      status: 200,
      msg: "Individual Student's Details",
      data: getStudent,
    });
  } catch (err) {
    return res.status(500).send({ status: 500, msg: err.message });
  }
};
