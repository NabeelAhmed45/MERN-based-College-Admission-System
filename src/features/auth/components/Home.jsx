import React, { useState, useEffect } from 'react';
import Input from "./component/input";
import useValidationForm from "./component/useForm";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Radio from "./component/radio";
import Tabs from "./component/tabs/Tabs";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from "react-toastify";


import './Home.css'

const initialState = {
  challan_form: "", degree_name: "", subject_name: "", subject2_name: "", subject3_name: "", merit: "",
  fname: "", lname: "", cnic: "", domicile: "", nationality: "", religion: "", email: "",
  dob: "", phone: "", faname: "", fathercnic: "", faphone: "", gender: "",qualification_matric: "", qualification_inter: "",qualification_BA: "",qualification_MA: "",qualification_other: "", board_matric: "", board_inter: "", board_ba: "", board_ma: "", board_other: "",roll_matric: "", roll_inter: "", roll_ba: "", roll_ma: "",roll_other: "",year_matric: "", year_inter: "", year_ba: "", year_ma: "", year_other: "", marks_matric: "", marks_inter: "",marks_ba: "",marks_ma: "",marks_other: "", total_matric: "", total_inter: "",total_ba: "",total_ma: "",total_other: "", street: "", village: "",
  tehsil: "", district: ""
};

function Home(props) {
  const { input, handleChange } = useValidationForm(initialState);
  const [formData, setFormData] = useState([]);
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data
  const [editing, setEditing] = useState(false); // State to toggle editing mode
  const navigate = useNavigate();
  const tabs = ["selection", "personal information", "academic qualification", "address"];
  const [tab, setTab] = useState(tabs[0]);
  const [validInputs, setValidInputs] = useState(false); // State to track valid inputs
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [userId, setUserId] = useState(null); 
  const { handleSubmit, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        console.log(user.uid) // Set the current user's ID
      } else {
        setIsLoggedIn(false);
        setUserId(null); // Clear user ID if not logged in
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Fetch all form data from backend when component mounts
    const fetchFormData = async () => {
      try {
        const response = await fetch('http://localhost:3500/home');
        const data = await response.json();
        setFormData(data);
        setSubmittedData(data); // Set initial submitted data
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  

  const onSubmit = async (data) => {
    if (!isLoggedIn) {
      toast.error("Please log in to submit the form");
      navigate('/studentlogin');
      return;
    }
  
   
  
    // Check if a record with the same CNIC exists
    try {
      const response = await fetch(`http://localhost:3500/home/checkCnic/${input.cnic}`);
      const responseData = await response.json();
  
      if (responseData.exists && !editing) {
        toast.error("A record with this CNIC already exists.");
        return;
      }
    } catch (error) {
      console.error('Error checking CNIC:', error);
      toast.error('Error checking CNIC');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3500/home/checkPhone/${input.phone}`);
      const responseData = await response.json();
  
      if (responseData.exists && !editing) {
        toast.error("A record with this Contact already exists.");
        return;
      }
    } catch (error) {
      console.error('Error checking Contact:', error);
      toast.error('Error checking Contact');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3500/home/checkEmail/${input.email}`);
      const responseData = await response.json();
  
      if (responseData.exists && !editing) {
        toast.error("A record with this email already exists.");
        return;
      }
    } catch (error) {
      console.error('Error checking Email:', error);
      toast.error('Error checking Email');
      return;
    }
  
    // If no record exists, proceed with form submission
    try {
      let endpoint = "http://localhost:3500/home";
      let method = "POST";
  
      if (editing) {
        // Find the correct _id from submittedData array
        const formDataToUpdate = Array.isArray(submittedData) && submittedData.find(item => item._id);
        if (!formDataToUpdate) {
          console.error('No valid form data to update found.');
          toast.error('Error updating form: Form data not found');
          return;
        }
        endpoint = `http://localhost:3500/home/${formDataToUpdate._id}`;
        method = "PUT";
      }
  
      const response = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
  
      const responseData = await response.json();
  
      console.log(input, responseData);
      setSubmittedData(responseData);
      toast.success(editing ? "Form updated successfully" : "Form submitted successfully");
      setFormSubmitted(true); // Update form submission state
      setEditing(false); // Exit editing mode after submission
      navigate('/aboutprogram');
  
    } catch (error) {
      console.error('Error sending form data:', error);
      toast.error('Error sending form data');
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate('/studentlogin');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const changeTab = () => {
    if (validateInputs()) {
      const currentIndex = tabs.indexOf(tab);
      const nextTab = tabs[currentIndex + 1] || tabs[0];
      setTab(nextTab);
    } else {
      toast.error("Please fill all fields");
    }
    
  };

  const validateInputs = () => {
    switch (tab) {
      case "selection":
        return (
          input.challan_form &&
          input.degree_name &&
          input.subject_name
        );
      case "personal information":
        return (
          input.fname &&
          input.lname &&
          input.cnic &&
          input.phone &&
          input.nationality &&
          input.religion &&
          input.email &&
          input.dob &&
          input.domicile &&
          input.faname &&
          input.fathercnic &&
          input.faphone &&
          input.gender
        );
      case "academic qualification":
        return (
          input.qualification_matric &&
          input.qualification_inter &&
          input.board_matric &&
          input.board_inter &&
          input.year_matric &&
          input.year_inter &&
          input.roll_matric &&
          input.roll_inter &&
          input.marks_matric &&
          input.marks_inter &&
          input.total_matric &&
          input.total_inter
        );
      case "address":
        return (
          input.street &&
          input.village &&
          input.tehsil &&
          input.district
        );
      default:
        return true;
    }
  };

  useEffect(() => {
    setValidInputs(validateInputs());
    
  }, [input, tab]);

  const handleEdit = () => {
    setEditing(true); // Enable editing mode
    toast.success("Please fill all fields again for editing");
  };
  const handleGoBack = () => {
    navigate('/aboutprogram') // Enable editing mode
  };

  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="body2">
        <section className="background-setting">
          <div className="header">
            <div className="logo-box">
              <img className="logo" src="../img/Logo.png" alt="AUST-Logo"></img>
            </div>
            <div className="text-box-student--side">
              <h1 className="heading-primary">Abbottabad University of Science & Technology</h1>
              <h2 className="heading-tertiary">Havelian, KPK, Pakistan</h2>
              
            </div>
            
          </div>
          <div className="header-detail">
            <h2 className="heading-secondary">Admission Form</h2>
            <h2 className="heading-secondary">( Bs / Pharm-D / Diploma )</h2>
            
            <button className="Editform__button" onClick={handleGoBack}>Back to Home</button>
            
            {submittedData && !editing && (
              <button className="Editform__button" onClick={handleEdit}>Edit Form</button>
            )}
            <button className="Editform__button" onClick={handleLogout}>Logout</button>
          </div>
          <section className="main-home-page">
            <Tabs tab={tab} setTab={setTab} tabs={tabs} />
            <form onSubmit={handleSubmit(onSubmit)}>
              {tab === "selection" && (
                <SelectionForm input={input} handleChange={handleChange} />
              )}
              {tab === "personal information" && (
                <PersonalInfoForm input={input} handleChange={handleChange} />
              )}
              {tab === "academic qualification" && (
                <AcademicQualificationForm input={input} handleChange={handleChange} />
              )}
              {tab === "address" && (
                <AddressForm input={input} formData={formData} handleChange={handleChange} />
              )}
              {tab === "address" && !editing && (
                <Input disabled={!validInputs} className="studentform__button" type="submit" value="Submit" />
              )}
              {tab === "address" && editing && (
                <Input disabled={isSubmitting} className="studentform__button"  type="submit" value="Save Changes" /> 
              )}
            </form>
            {tab !== "address" && <button disabled={!validInputs} className="studentform__button" onClick={changeTab}>
              Next
            </button>}
          </section>
        </section>
      </div>
    </>
  );
}
function SelectionForm({ input, handleChange }) { 
  return (
    <section className="selection">
      <h2 className="heading-tertiary">1. Selection</h2>
      <p>Sr # ________</p>
      <h3 className="heading-tertiary select-program"> Challan Form No. </h3>
        <Input
          placeholder="Enter Challan Form Number"
          className="selection-input"
          type="text"
          required={true}
          name="challan_form"
          value={input?.challan_form}
          message="This field is required"
          onChange={handleChange}
        />
      <div className="Input-program">
        <h3 className="heading-tertiary select-program"> ( Bs / Pharm-D / Diploma )</h3>
        

        <select
          className="selection-input"
          type="text"
          required={true}
          name="degree_name"
          value={input?.degree_name}
          message="This field is required"
          onChange={handleChange}
        >
        <option value=""> Required </option>
        <option value="BS">BS</option>
        <option value="Pharm-D">Pharm-D</option>
        <option value="Diploma">Diploma</option>
        </select>
        &nbsp;&nbsp;
        {/* <Input
          placeholder="Select one of these"
          className="selection-input"
          type="text"
          required={true}
          name="degree_name"
          value={input?.degree_name}
          message="This field is required"
          onChange={handleChange}
        /> */}
      </div>
      <div className="department-priority">
        <div className="department-priority--heading">
          <h3 className="heading-tertiary select-program">Department</h3>
          <p>( Priority Wise )</p>
        </div>
        
        <select
          placeholder="Option 1"
          className="selection-input"
          type="text"
          required={true}
          name="subject_name"
          value={input?.subject_name}
          message="This field is required"
          onChange={handleChange}
        >
        <option value=""> Required </option>
        <option value="CS">CS</option>
        <option value="Psycology">Psycology</option>
        <option value="MLT">MLT</option>
        <option value="Pharmacy">Pharmacy</option></select>
        &nbsp;&nbsp;
        <select
          placeholder="Option 2"
          className="selection-input"
          name="subject2_name"
          value={input?.subject2_name}
          type="text"
          onChange={handleChange}
        >
        <option value=""> Optional </option>
        <option value="CS">CS</option>
        <option value="Psycology">Psycology</option>
        <option value="MLT">MLT</option>
        <option value="Pharmacy">Pharmacy</option></select>
        &nbsp;&nbsp;
        <select
          placeholder="Option 3"
          className="selection-input"
          type="text"
          name="subject3_name"
          value={input?.subject3_name}
          onChange={handleChange}
        >
        <option value=""> Optional </option>
        <option value="CS">CS</option>
        <option value="Psycology">Psycology</option>
        <option value="MLT">MLT</option>
        <option value="Pharmacy">Pharmacy</option></select>
      </div>
      <div className="merit-selection--radio department-priority">
      
       

        <select
          className="selection-input"
          type="text"
          required={true}
          name="merit"
          value={input?.merit}
          message="This field is required"
          onChange={handleChange}
        >
        <option value=""> Select Merit Category</option>
        <option value="Self-Support">Self-Support</option>
        <option value="Merit">Merit</option>
        <option value="Quota">Quota</option>
        </select>
        &nbsp;&nbsp;
        {/* <Radio
          name="merit"
          value={input?.merit}
          type="radio"
          selected
          items={["Self-Support", "Quota", "Open-Merit"]}
          onChange={handleChange}
        /> */}
      </div>
    </section>
  );
}

function PersonalInfoForm({ input, handleChange }) {
  return (
    <section className="personal-information">
      <h2 className="heading-tertiary">2. Personal Information Form</h2>
      <div className="container">
        {/* Form group 1 */}
        <div className="form-group">
          <label className="label-field" htmlFor="fname">First Name:</label>
          <Input
            placeholder="e.g  'Hamza' etc"
            className="input-field"
            type="text"
            id="fname"
            name="fname"
            value={input?.fname}
            required={true}
            message="This field is required"
            onChange={handleChange}
          />
          <label className="label-field" htmlFor="lname">Last Name:</label>
          <Input
            placeholder="e.g  'Ahmed' etc"
            className="input-field"
            type="text"
            id="lname"
            name="lname"
            value={input?.lname}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        {/* Form group 2 */}
        <div className="form-group">
          <label className="label-field" htmlFor="cnic">Candidate CNIC:</label>
          <Input
            placeholder="xxxxxxxxxxxxx"
            className="input-field"
            type="text"  // Change type to "text"
            pattern="[0-9]{0,13}"  // Allow up to 13 digits
            id="cnic"
            name="cnic"
            value={input?.cnic}
            onChange={handleChange}
            required={true}
            message="This field is required"
            
          />
          <label className="label-field" htmlFor="phone">Candidate Phone # :</label>
          <Input
            placeholder="03xxxxxxxxx"
            className="input-field"
            type="text"
            pattern="[0-9]{0,11}"
            id="phone"
            name="phone"
            value={input?.phone}
            onChange={handleChange}
            required={true}
            message="This field is required"
            
          />
        </div>
        {/* Form group 3 */}
        <div className="form-group">
          <label className="label-field" htmlFor="nationality">Nationality:</label>
          <Input
            placeholder="Country Name"
            className="input-field"
            type="text"
            id="nationality"
            name="nationality"
            value={input?.nationality}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <label className="label-field" htmlFor="religion">Relegion:</label>
          <Input
            type="text"
            className="input-field"
            id="religion"
            name="religion"
            value={input?.religion}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        {/* Form group 4 */}
        <div className="form-group">
          <label className="label-field" htmlFor="email">Email:</label>
          <Input
            placeholder="example@email.com"
            className="input-field"
            type="email"
            id="email"
            name="email"
            value={input?.email}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <label className="label-field" htmlFor="dob">Date of Birth :</label>
          <Input
            type="date"
            className="input-field"
            id="dob"
            name="dob"
            value={input?.dob}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        {/* Form group 5 */}
        <div className="form-group">
        <label className="label-field" htmlFor="domicile">Domicile:</label>
          <Input
            placeholder="City Name"
            className="input-field"
            type="text"
            id="domicile"
            name="domicile"
            value={input?.domicile}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          
          <label className="label-field" htmlFor="faname">Father Name :</label>
          <Input
            placeholder="e.g  'Zubair' etc"
            className="input-field"
            type="text"
            id="faname"
            name="faname"
            value={input?.faname}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        {/* Form group 6 */}
        <div className="form-group">
          <label className="label-field" htmlFor="fathercnic">Father's CNIC :</label>
          <Input
            placeholder="xxxxxxxxxxxxx"
            className="input-field"
            type="text"
            pattern="[0-9]{0,13}"
            id="fathercnic"
            name="fathercnic"
            value={input?.fathercnic}
            onChange={handleChange}
            required={true}
            message="This field is required"
            
          />
          <label className="label-field" htmlFor="faphone">Guardian Phone #:</label>
          <Input
            placeholder="03xxxxxxxxx"
            className="input-field"
            type="text"
            pattern="[0-9]{0,11}"
            id="faphone"
            name="faphone"
            value={input?.faphone}
            onChange={handleChange}
            required={true}
            message="This field is required"
            
          />
        </div>
        {/* Gender selection */}
        <div className="gender-selection">
          
          <select
         className="input-field dropdown_gender"
          type="text"
          required={true}
          name="gender"
            value={input?.gender}
          message="This field is required"
          onChange={handleChange}
        >
        <option value=""> Select Gender </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        </select>
          {/* <Radio
            name="gender"
            value={input?.gender}
            type="radio"
            selected
            items={["Male", "Female", "Other"]}
            onChange={handleChange}
          /> */}
        </div>
      </div>
    </section>
  );
}

function AcademicQualificationForm({ input, handleChange }) {
  return (
    <section className="academic-info">
      <h2 className="heading-tertiary">3. Academic Qualifications</h2>
      <div className="align-container">
        <div className="form-group-align">
          <br></br><br></br>
          <label className="academy-section--label" htmlFor="qualification">
            Qualifications
          </label>
          <Input
            className="academy-section--input-field"
            placeholder="Matric / SSC"
            type="text"
            id="qualification"
            name="qualification_matric"
            value={input?.qualification_matric}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            placeholder="Inter / HSSC"
            className="academy-section--input-field"
            type="text"
            name="qualification_inter"
            value={input?.qualification_inter}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            placeholder="BA / BSc / AD"
            className="academy-section--input-field"
            type="text"
            name="qualification_BA"
            value={input?.qualification_BA}
            onChange={handleChange}
          />
          <Input
            placeholder="BS(4 years)/MA/MSc"
            className="academy-section--input-field"
            type="text"
            name="qualification_MA"
            value={input?.qualification_MA}
            onChange={handleChange}
          />
          <Input
            placeholder="Any Other"
            className="academy-section--input-field"
            type="text"
            name="qualification_other"
            value={input?.qualification_other}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-align">
        <br></br><br></br>
          <label className="academy-section--label" htmlFor="board">Board/University</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="board"
            name="board_matric"
            value={input?.board_matric}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            type="text"
            className="academy-section--input-field"
            name="board_inter"
            value={input?.board_inter}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            type="text"
            className="academy-section--input-field"
            name="board_ba"
            value={input?.board_ba}
            onChange={handleChange}
          />
          <Input
            type="text"
            className="academy-section--input-field"
            name="board_ma"
            value={input?.board_ma}
            onChange={handleChange}
          />
          <Input
            type="text"
            className="academy-section--input-field"
            name="board_other"
            value={input?.board_other}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-align">
        <br></br><br></br>
          <label className="academy-section--label" htmlFor="year">Year</label>
          <Input
            type="number"
            
            className="academy-section--input-field"
            id="year"
            name="year_matric"
            value={input?.year_matric}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            type="number"
            
            className="academy-section--input-field"
            name="year_inter"
            value={input?.year_inter}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            className="academy-section--input-field"
            type="number"
            
            name="year_ba"
            value={input?.year_ba}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="number"
            
            name="year_ma"
            value={input?.year_ma}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="number"
            
            name="year_other"
            value={input?.year_other}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-align">
        <br></br><br></br>
          <label className="academy-section--label" htmlFor="roll">Roll no.</label>
          <Input
            type="number"
            
            className="academy-section--input-field"
            id="roll"
            name="roll_matric"
            value={input?.roll_matric}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            type="number"
            
            name="roll_inter"
            value={input?.roll_inter}
            onChange={handleChange}
            className="academy-section--input-field"
            required={true}
            message="This field is required"
          />
          <Input
            className="academy-section--input-field"
            type="number"
            
            name="roll_ba"
            value={input?.roll_ba}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="number"
            
            name="roll_ma"
            value={input?.roll_ma}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="number"
            
            name="roll_other"
            value={input?.roll_other}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-align">
          <br></br>
          <label className="academy-section--label" htmlFor="marks">Marks Obtained / CGPA / Percentage</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="marks"
            name="marks_matric"
            value={input?.marks_matric}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            type="text"
            className="academy-section--input-field"
            name="marks_inter"
            value={input?.marks_inter}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            className="academy-section--input-field"
            type="text"
            name="marks_ba"
            value={input?.marks_ba}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="text"
            name="marks_ma"
            value={input?.marks_ma}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="text"
            name="marks_other"
            value={input?.marks_other}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-align">
        <br></br><br></br>
          <label className="academy-section--label" htmlFor="total">Total Marks</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="total"
            name="total_matric"
            value={input?.total_matric}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            type="text"
            className="academy-section--input-field"
            name="total_inter"
            value={input?.total_inter}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
          <Input
            className="academy-section--input-field"
            type="text"
            name="total_ba"
            value={input?.total_ba}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="text"
            name="total_ma"
            value={input?.total_ma}
            onChange={handleChange}
          />
          <Input
            className="academy-section--input-field"
            type="text"
            name="total_other"
            value={input?.total_other}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}

function AddressForm({ input, handleChange }) {
  return (
    <section className="address-section">
      <h2 className="heading-tertiary last__section--address">4. Address</h2>
      <div className="align-container">
        <div className="form-group-align">
          <br></br>
          <br></br>
          <label className="academy-section--label" htmlFor="street">Current Resident</label>
        </div>
        <div className="form-group-align">
          <label className="academy-section--label" htmlFor="street">Street / Area etc</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="street"
            name="street"
            value={input?.street}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        <div className="form-group-align">
          <label className="academy-section--label" htmlFor="village">Village / Town</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="village"
            name="village"
            value={input?.village}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        <div className="form-group-align">
          <label className="academy-section--label" htmlFor="tehsil">Tehsil</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="tehsil"
            name="tehsil"
            value={input?.tehsil}
            onChange={handleChange}
            required={true}
            message="This field is required"
          />
        </div>
        <div className="form-group-align">
          <label className="academy-section--label" htmlFor="district">District</label>
          <Input
            type="text"
            className="academy-section--input-field"
            id="district"
            name="district"
            value={input?.district}
            onChange={handleChange}
            required={true}
            message="This field is required"
          /> 
        </div>
      </div>
    </section>
    
  );
  
}



export default Home;
