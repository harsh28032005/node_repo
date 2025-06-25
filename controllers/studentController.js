import Student from "../models/studentModel.js";

export const createStudent = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send({ status: 400, msg: "Request body can not be empty..." });
    }
    if (!req.body.fname) {
      return res.status(400).send({ status: 400, msg: "Name is required." });
    }
    if (!isNaN(req.body.fname || req.body.fname.trim())) {
      return res.status(400).send({ status: 400, msg: "Invalid Name." });
    }
    if (!req.body.lname) {
      return res.status(400).send({ status: 400, msg: "Name is required." });
    }
    if (!isNaN(req.body.lname || req.body.fname.trim())) {
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
