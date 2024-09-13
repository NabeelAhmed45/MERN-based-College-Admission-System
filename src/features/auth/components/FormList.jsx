import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FormList.css';

function FormList(props) {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold selected student details
  const [selectedSubject, setSelectedSubject] = useState(''); // State to hold selected subject name
  const [filteredStudents, setFilteredStudents] = useState([]); // State to hold filtered students based on selected subject

  useEffect(() => {
    // Fetch all form data from backend when component mounts
    const fetchFormData = async () => {
      try {
        const response = await fetch('http://localhost:3500/home');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  // Function to fetch detailed information of a selected student by ID
  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3500/home/${studentId}`);
      const data = await response.json();
      setSelectedStudent(data); // Update state with selected student details
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  // Filter data based on search term
  const filteredFormData = formData.filter(item => {
    if (item && item.fname && item.lname) {
      return (
        item.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false; // Return false for items that do not meet the criteria
  });

  // Handle selection of subject from dropdown
  useEffect(() => {
    if (selectedSubject) {
      const filtered = formData.filter(item => 
        item.subject_name === selectedSubject ||
        item.subject2_name === selectedSubject ||
        item.subject3_name === selectedSubject
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [selectedSubject, formData]);

  // Extract unique subject names from formData for dropdown options
  const subjectNames = [...new Set(formData.map(item => item.subject_name))];
  const subject2Names = [...new Set(formData.map(item => item.subject2_name))];
  const subject3Names = [...new Set(formData.map(item => item.subject3_name))];
  const allSubjects = [...new Set([...subjectNames, ...subject2Names, ...subject3Names])];

  return (
    <>
      <div className="body2 formlist_body">
        <section className="background-setting-formlist">
          <div className="header">
            <div className="logo-box">
              <img className="logo" src="../img/Logo.png" alt="AUST-Logo" />
            </div>
            <div className="text-box-student--side">
              <h1 className="heading-primary">Abbottabad University of Science & Technology</h1>
              <h2 className="heading-tertiary">Havelian, KPK, Pakistan</h2>
            </div>
          </div>
          <div className="header-detail">
            <h2 className="heading-secondary">Form Data List</h2>
            <h2 className="heading-secondary">(BS / Pharm-D / Diploma)</h2>
            <span className='footer'>
                <Link to="/dash">Back to Home</Link>
            </span>
          </div>
          <section className="home-page">
            <div>
              
              <div className="dropdown">
                <select
                  className="dropdown"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {allSubjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <h1 className='list-h1'>Form Data List</h1>
              <ul>
                {filteredStudents.map((formDataItem, index) => (
                  <li key={index}>
                    {/* Display clickable names */}
                    <button
                      className="student-name"
                      onClick={() => fetchStudentDetails(formDataItem._id)} 
                    >
                      {formDataItem.fname} {formDataItem.lname}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {selectedStudent && (
              <div className="student-details">
                <h2>Student Details</h2>
                <h2>Selection</h2>
                <p>Challan Form No. : {selectedStudent.challan_form}</p>
                <p>Degree Name: {selectedStudent.degree_name}</p>
                <p>Department Name : {selectedStudent.subject_name} (1st Priority)</p>
                <p>Department Name: {selectedStudent.subject2_name}(2nd Priority)</p>
                <p>Department Name: {selectedStudent.subject3_name}(3rd Priority)</p>
                <p>Merit: {selectedStudent.merit}</p>
                <h2>Personal Information</h2>
                <p>First Name: {selectedStudent.fname}</p>
                <p>Last Name: {selectedStudent.lname}</p>
                <p>CNIC: {selectedStudent.cnic}</p>
                <p>Contact: {selectedStudent.phone}</p>
                <p>Domicile: {selectedStudent.domicile}</p>
                <p>Nationality: {selectedStudent.nationality}</p>
                <p>Relegion: {selectedStudent.religion}</p>
                <p>Email: {selectedStudent.email}</p>
                <p>Date-of-Birth: {selectedStudent.dob}</p>
                <p>Contact No. : {selectedStudent.phone}</p>
                <p>Father Name : {selectedStudent.faname}</p>
                <p>Father CNIC : {selectedStudent.fathercnic}</p>
                <p>Father Contact No. : {selectedStudent.faphone}</p>
                <p>Gender : {selectedStudent.gender}</p>
                <h2>Qualification</h2>
                <h3>Matriculation </h3>
                <p>Board / University :   {selectedStudent.board_matric} </p>
                <p>Year :   {selectedStudent.year_matric} </p>
                <p>Roll no. :   {selectedStudent.roll_matric}</p>
                <p>Marks Obtained / CGPA / Percentage :   {selectedStudent.marks_matric}</p>
                <p>  Total Marks / CGPA / Percentage  :   {selectedStudent.total_matric}</p>
                <h3>Intermediate</h3>
                <p>Board / University :   {selectedStudent.board_inter} </p>
                <p>Year :   {selectedStudent.year_inter} </p>
                <p>Roll no. :   {selectedStudent.roll_inter}</p>
                <p>Marks Obtained / CGPA / Percentage :   {selectedStudent.marks_inter}</p>
                <p>  Total Marks / CGPA / Percentage  :   {selectedStudent.total_inter}</p>
                <h3>B.A. </h3>
                <p>Board / University :   {selectedStudent.board_BA} </p>
                <p>Year :   {selectedStudent.year_ba} </p>
                <p>Roll no. :   {selectedStudent.roll_ba}</p>
                <p>Marks Obtained / CGPA / Percentage :   {selectedStudent.marks_ba}</p>
                <p>  Total Marks / CGPA / Percentage  :   {selectedStudent.total_ba}</p>
                <h3>M.A. </h3>
                <p>Board / University :   {selectedStudent.board_MA} </p>
                <p>Year :   {selectedStudent.year_ma} </p>
                <p>Roll no. :   {selectedStudent.roll_ma}</p>
                <p>Marks Obtained / CGPA / Percentage :   {selectedStudent.marks_ma}</p>
                <p>  Total Marks / CGPA / Percentage  :   {selectedStudent.total_ma}</p>
                <h3>Other </h3>
                <p>Board / University :   {selectedStudent.board_other} </p>
                <p>Year :   {selectedStudent.year_other} </p>
                <p>Roll no. :   {selectedStudent.roll_other}</p>
                <p>Marks Obtained / CGPA / Percentage :   {selectedStudent.marks_other}</p>
                <p>  Total Marks / CGPA / Percentage  :   {selectedStudent.total_other}</p>
                <h2>Address</h2>
                <p>Street : {selectedStudent.street}</p>
                <p>Village : {selectedStudent.village}</p>
                <p>Tehsil : {selectedStudent.tehsil}</p>
                <p>District : {selectedStudent.district}</p>
                {/* Display other details as needed */}
              </div>
            )}
              
          </section>
        </section>
      </div>
    </>
  );
}

export default FormList;
