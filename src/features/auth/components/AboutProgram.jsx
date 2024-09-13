  import { useNavigate } from 'react-router-dom';
  import { signOut } from 'firebase/auth';
  import { auth } from './firebase';
  import React, { useState, useEffect } from 'react';

  import './AboutProgram.css';



  function AboutProgram(props) {
    const [formData, setFormData] = useState([]);
 
  const [cnicSearchTerm, setCnicSearchTerm] = useState(''); // CNIC search term
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold selected student details
  const [selectedSubject, setSelectedSubject] = useState(''); // State to hold selected subject name
  const [filteredStudents, setFilteredStudents] = useState([]); // State to hold filtered students based on selected subject
  const [filteredByCnic, setFilteredByCnic] = useState(null); // State to hold student filtered by CNIC
  const [error, setError] = useState(''); // State to hold error message

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
      setFilteredByCnic(null); // Clear CNIC filter when selecting by ID
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  // Function to filter student by CNIC
  const handleCnicSearch = () => {
    const student = formData.find(item => item.cnic === cnicSearchTerm);
    if (student) {
      setFilteredByCnic(student);
      setSelectedStudent(null); // Clear student selection when searching by CNIC
      setError('');
    } else {
      setFilteredByCnic(null);
      setError('No data found for this CNIC.');
    }
  };



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
 
    
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/studentlogin');
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    };
    

    return (
      <>
        <div className="body2">
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
              <h2 className="heading-secondary">About / Overview</h2>
              <h2 className="heading-secondary">( BS / Pharm-D / Diploma ) </h2>
              <button className="Editform__button" onClick={handleLogout}>Logout</button>
            </div>
              
            
            <section className="home-page" id='aboutprogram'>
              <div>
              <div className="cnic-search-bar">
                <input
                  className='searchbar'
                  type="text"
                  value={cnicSearchTerm}
                  onChange={(e) => setCnicSearchTerm(e.target.value)}
                  placeholder="Enter CNIC"
                />
                <button className="cnic_button" onClick={handleCnicSearch}>Search by CNIC</button>
              </div>
              <ul>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((formDataItem, index) => (
                    <li key={index}>
                      <button
                        className="student-name"
                        onClick={() => fetchStudentDetails(formDataItem._id)} 
                      >
                        {formDataItem.fname} {formDataItem.lname}
                      </button>
                    </li>
                  ))
                ) : (
                  filteredByCnic && (
                    <li>
                      <button
                        className="student-name"
                        onClick={() => fetchStudentDetails(filteredByCnic._id)} 
                      >
                        {filteredByCnic.fname} {filteredByCnic.lname}
                      </button>
                    </li>
                  )
                )}
              </ul>
            
                <ul class="bullet-list">
                
                <li className='list link_apply'><strong><a href='/home'>Apply Now</a></strong></li>
                <li className='list'><a href='#popup'>Fee Structure</a></li>
                <li className='list'><a href='#popup1'>Merit List</a></li>
                

                </ul>
                
              </div>
              
              
                <div className="overview">
                  <h2>Overview</h2>
                  <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  
                  
                </div>
                {selectedStudent && (
              <div className="student-details overview">
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
            
            
                <div className="popup" id= "popup">
                  <div className="popup__content">
                  <span class="close"> <a href='#aboutprogram'>&times;</a></span>
                  
                      <div className="popup__center">
                      <h3 className='center__popup--text'>Overview of Fee Structure</h3>
                      
                      <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      </div>
                  </div>
                </div>
                <div className="popup" id= "popup1">
                  <div className="popup__content">
                  <span class="close"> <a href='#aboutprogram'>&times;</a></span>
                  
                      <div className="popup__center">
                      <h3 className='center__popup--text'>This section is about Merit</h3>
                      
                      <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      </div>
                  </div>
                </div>
            </section>
          </section>
        </div>
      </>
    );
  }

  export default AboutProgram;
