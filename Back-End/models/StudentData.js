  const mongoose = require('mongoose');

  const formDataSchema = new mongoose.Schema({
    challan_form: String,
    degree_name: String,
    subject_name: String,
    subject2_name: String,
    subject3_name: String,
    merit: String,
    fname: String,
    lname: String,
    cnic: String,
    domicile: String,
    nationality: String,
    religion: String,
    email: String,
    dob: String,
    phone: String,
    faname: String,
    fathercnic: String,
    faphone: String,
    gender: String,
    qualification_matric: String,
    qualification_inter: String,
    qualification_BA: String,
    qualification_MA: String,
    qualification_other: String,
    board_matric: String,
    board_inter: String,
    board_ba: String,
    board_ma: String,
    board_other: String,
    roll_matric: String,
    roll_inter: String,
    roll_ba: String,
    roll_ma: String,
    roll_other: String,
    year_matric: String,
    year_inter: String,
    year_ba: String,
    year_ma: String,
    year_other: String,
    marks_matric: String,
    marks_inter: String,
    marks_ba: String,
    marks_ma: String,
    marks_other: String,
    total_matric: String,
    total_inter: String,
    total_ba: String,
    total_ma: String,
    total_other: String,
    street: String,
    village: String,
    tehsil: String,
    district: String,
    // Add more fields as needed
  });

  const FormDataModel = mongoose.model('FormData', formDataSchema);

  module.exports = FormDataModel;
