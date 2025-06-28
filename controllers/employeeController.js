import Employee from "../models/employeeModel.js";

export const createEmployee = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send({ status: 400, msg: "Request Body can not be empty..." });
    }
    if (!req.body.name) {
      return res.status(400).send({ status: 400, msg: "Name is required." });
    }
    if (!isNaN(req.body.name) || !req.body.name.trim()) {
      return res.status(400).send({ status: 400, msg: "Invalid Name." });
    }
    if (!req.body.age) {
      return res.status(400).send("Age is required.");
    }
    if (typeof req.body.age != "number") {
      return res
        .status(400)
        .send({ status: 400, msg: "Age must be a number." });
    }
    if (!req.body.gender) {
      return res.status(400).send("Gender is required.");
    }
    if (!isNaN(req.body.gender) || !req.body.gender.trim()) {
      return res.status(400).send({ status: 400, msg: "Invalid Gender" });
    }
    if (!["male", "female"].includes(req.body.gender.toLowerCase())) {
      return res.status(400).send("Gender must be male or female.");
    }
    if (!req.body.mobile) {
      return res.status(400).send("Mobile number is required.");
    }
    if (typeof req.body.mobile != "number") {
      return res.status(400).send("Mobile number must be a number.");
    }

    const isNumExist = await Employee.findOne({ mobile: req.body.mobile });
    if (isNumExist) {
      return res.status(400).send("Number already exists.");
    }
    if (!req.body.email) {
      return res.status(400).send("Email is required.");
    }
    if (typeof req.body.email != "string") {
      return res.status(400).send("Email must be a string");
    }
    const isMailExist = await Employee.findOne({ email: req.body.email });
    if (isMailExist) {
      return res.status(400).send("Email is already exist.");
    }
    req.body.gender = req.body.gender.toLowerCase();
    const savedata = await Employee.create(req.body);
    return res.status(201).send({
      status: 201,
      msg: "Employee created successfully.",
      data: savedata,
    });
  } catch {
    return res.status(500).send("Internal Server Error.");
  }
};
export const getAllEmployees = async (req, res) => {
  try {
    
    let { name, age, page = 1, limit = 2 } = req.query;
    let filter = {};

    if(isNaN(page) || page == 0){
      return res.status(400).send({
        status: 400, msg: "Page must be a number and can not be 0"
      })
    }
    if(isNaN(limit) || page == 0){
      return res.status(400).send({
        status: 400, msg: "Limit must be a number and can not be 0"
      })
    }
    if (name) {
      filter.name = name;
    }
    if (age) {
      filter.age = age;
    }

    page = +page ? +page : 1
    limit = +limit ? +limit : 2
    const skip = (page - 1) * limit;
    const getEmployee = await Employee.find(filter).select({_id: 1, name: 1, age: 1}).limit(limit).skip(skip).sort({_id : -1});
    const total = await Employee.countDocuments(filter)
    console.log(filter, "filter")
    // const getEmployee = await Employee.findOne(filter)
    return res
      .status(200)
      .send({ status: 200, msg: "List of all employees", data: getEmployee, count: total });
  } catch {
    return res.status(500).send({status: 500, msg: "Internal Server Error"})
  }
};
