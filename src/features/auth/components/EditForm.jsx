// import React, { useState, useEffect } from 'react';
// import Input from "./component/input";
// import useValidationForm from "./component/useForm";
// import { useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import Radio from "./component/radio";
// import Tabs from "./component/tabs/Tabs";
// import { signOut } from 'firebase/auth';
// import { auth } from './firebase';
// import { toast } from "react-toastify";


// import './Home.css'

// const initialState = {
//   degree_name: "", subject_name: "", subject2_name: "", subject3_name: "", merit: "",
//   fname: "", lname: "", cnic: "", domicile: "", nationality: "", religion: "", email: "",
//   dob: "", phone: "", faname: "", fathercnic: "", faphone: "", gender: "",qualification_matric: "", qualification_inter: "",qualification_BA: "",qualification_MA: "",qualification_other: "", board_matric: "", board_inter: "", board_ba: "", board_ma: "", board_other: "",roll_matric: "", roll_inter: "", roll_ba: "", roll_ma: "",roll_other: "",year_matric: "", year_inter: "", year_ba: "", year_ma: "", year_other: "", marks_matric: "", marks_inter: "",marks_ba: "",marks_ma: "",marks_other: "", total_matric: "", total_inter: "",total_ba: "",total_ma: "",total_other: "", street: "", village: "",
//   tehsil: "", district: ""
// };

// function Home(props) {
//   const { input, handleChange } = useValidationForm(initialState);
//   const [formData, setFormData] = useState([]);
//   const [submittedData, setSubmittedData] = useState(null); // State to store submitted data
//   const [editing, setEditing] = useState(false); // State to toggle editing mode
//   const navigate = useNavigate();
//   const tabs = ["selection", "personal information", "academic qualification", "address"];
//   const [tab, setTab] = useState(tabs[0]);
//   const [validInputs, setValidInputs] = useState(false); // State to track valid inputs
//   const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
//   const [userId, setUserId] = useState(null); 
//   const { handleSubmit, formState: { isSubmitting } } = useForm();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Logged out successfully");
//       navigate('/studentlogin');
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   };

//   useEffect(() => {
//     // Check if user is logged in
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         setIsLoggedIn(true);
//         setUserId(user.uid);
//         console.log(user.uid) // Set the current user's ID
//       } else {
//         setIsLoggedIn(false);
//         setUserId(null); // Clear user ID if not logged in
//       }
//     });

//     return unsubscribe;
//   }, []);
 

//   const delay = (d) => new Promise((resolve) => setTimeout(resolve, d * 1000));

//   const onSubmit = async (data) => {
//     if (!isLoggedIn) {
//       toast.error("Please log in to submit the form");
//       navigate('/studentlogin');
//       return;
//     }
  
//     if (formSubmitted) {
//       toast.error("Form already submitted");
//       navigate('/aboutprogram');
//       return;
//     }
  
//     // Check if a record with the same CNIC exists
//     try {
//       const response = await fetch(`http://localhost:3500/home/checkCnic/${input.cnic}`);
//       const responseData = await response.json();
  
//       if (responseData.exists) {
//         toast.error("A record with this CNIC already exists.");
//         return;
//       }
//     } catch (error) {
//       console.error('Error checking CNIC:', error);
//       toast.error('Error checking CNIC');
//       return;
//     }
  
//     // If no record exists, proceed with form submission
//     try {
//       const response = await fetch("http://localhost:3500/home", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(input),
//       });
  
//       const responseData = await response.json();
      
//       console.log(input, responseData);
//       setSubmittedData(responseData);
//       toast.success("Form submitted successfully");
//       setFormSubmitted(true); // Update form submission state
//       setEditing(false); // Exit editing mode after submission
      
//     } catch (error) {
//       console.error('Error sending form data:', error);
//       toast.error('Error sending form data');
//     }
//   };

// //   useEffect(() => {
// //     // Fetch all form data from backend when component mounts
// //     const fetchFormData = async () => {
// //       try {
// //         const response = await fetch('http://localhost:3500/home');
// //         const data = await response.json();
// //         setFormData(data);
// //         setSubmittedData(data); // Set initial submitted data
// //       } catch (error) {
// //         console.error('Error fetching form data:', error);
// //       }
// //     };

// //     fetchFormData();
// //   }, []);

// //   const changeTab = () => {
// //     if (validateInputs()) {
// //       const currentIndex = tabs.indexOf(tab);
// //       const nextTab = tabs[currentIndex + 1] || tabs[0];
// //       setTab(nextTab);
// //     } else {
// //       toast.error("Please fill all fields");
// //     }
// //   };

// //   const validateInputs = () => {
// //     switch (tab) {
// //       case "selection":
// //         return (
// //           input.degree_name &&
// //           input.subject_name
// //         );
// //       case "personal information":
// //         return (
// //           input.fname &&
// //           input.lname &&
// //           input.cnic &&
// //           input.phone &&
// //           input.nationality &&
// //           input.religion &&
// //           input.email &&
// //           input.dob &&
// //           input.domicile &&
// //           input.faname &&
// //           input.fathercnic &&
// //           input.faphone &&
// //           input.gender
// //         );
// //       case "academic qualification":
// //         return (
// //           input.qualification_matric &&
// //           input.qualification_inter &&
// //           input.board_matric &&
// //           input.board_inter &&
// //           input.year_matric &&
// //           input.year_inter &&
// //           input.roll_matric &&
// //           input.roll_inter &&
// //           input.marks_matric &&
// //           input.marks_inter &&
// //           input.total_matric &&
// //           input.total_inter
// //         );
// //       case "address":
// //         return (
// //           input.street &&
// //           input.village &&
// //           input.tehsil &&
// //           input.district
// //         );
// //       default:
// //         return toast.error("Please fill all fields");
// //     }
// //   };

// //   useEffect(() => {
// //     setValidInputs(validateInputs());
// //   }, [input, tab]);

// //   const handleEdit = () => {
// //     setEditing(true); // Enable editing mode
// //   };

// //   return (
// //     <>
// //       {isSubmitting && <div>Loading...</div>}
// //       <div className="body2">
// //         <section className="background-setting">
// //           <div className="header">
// //             <div className="logo-box">
// //               <img className="logo" src="../img/Logo.png" alt="AUST-Logo"></img>
// //             </div>
// //             <div className="text-box-student--side">
// //               <h1 className="heading-primary">Abbottabad University of Science & Technology</h1>
// //               <h2 className="heading-tertiary">Havelian, KPK, Pakistan</h2>
// //             </div>
// //           </div>
// //           <div className="header-detail">
// //             <h2 className="heading-secondary">Admission Form</h2>
// //             <h2 className="heading-secondary">( Bs / Pharm-D / Diploma )</h2>
// //             {submittedData && !editing && (
// //               <button className="Editform__button" onClick={handleEdit}>Edit Form</button>
// //             )}
// //             <button className="Editform__button" onClick={handleLogout}>Logout</button>
// //           </div>
// //           <section className="main-home-page">
// //             <Tabs tab={tab} setTab={setTab} tabs={tabs} />
// //             <form onSubmit={handleSubmit(onSubmit)}>
// //               {tab === "selection" && (
// //                 <SelectionForm input={input} handleChange={handleChange} />
// //               )}
// //               {tab === "personal information" && (
// //                 <PersonalInfoForm input={input} handleChange={handleChange} />
// //               )}
// //               {tab === "academic qualification" && (
// //                 <AcademicQualificationForm input={input} handleChange={handleChange} />
// //               )}
// //               {tab === "address" && (
// //                 <AddressForm input={input} formData={formData} handleChange={handleChange} />
// //               )}
// //               {tab === "address" && !editing && (
// //                 <Input disabled={!validInputs} className="studentform__button" type="submit" value="Submit" />
// //               )}
// //               {tab === "address" && editing && (
// //                 <Input disabled={isSubmitting} className="studentform__button"  type="submit" value="Save Changes" /> 
// //               )}
// //             </form>
// //             {tab !== "address" && <button disabled={!validInputs} className="studentform__button" onClick={changeTab}>
// //               Next
// //             </button>}
// //           </section>
// //         </section>
// //       </div>
// //     </>
// //   );
// // }



// app.get('/home/checkCnic/:cnic', async (req, res) => {
//     try {
//       const { cnic } = req.params;
//       const existingForm = await Form.findOne({ cnic });
//       res.json({ exists: !!existingForm });
//     } catch (error) {
//       console.error('Error checking CNIC:', error);
//       res.status(500).json({ error: 'Error checking CNIC' });
//     }
//   });
  
//   // Create a new form entry
//   app.post('/home', async (req, res) => {
//     try {
//       const formData = req.body;
//       const newForm = new Form(formData);
//       const savedForm = await newForm.save();
//       res.status(201).json(savedForm);
//     } catch (error) {
//       console.error('Error saving form:', error);
//       res.status(500).json({ error: 'Error saving form' });
//     }
//   });
  
//   // Update an existing form entry
//   app.put('/home/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const formData = req.body;
//       const updatedForm = await Form.findByIdAndUpdate(id, formData, { new: true });
//       res.json(updatedForm);
//     } catch (error) {
//       console.error('Error updating form:', error);
//       res.status(500).json({ error: 'Error updating form' });
//     }
//   });