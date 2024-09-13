import { useEffect, useState } from "react";

const useValidationForm = (props) => {
  const { initialState = {} } = props;
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e, fieldName) => {
    let name, value;
    
    if (e?.target) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = fieldName;
      value = e;
    }

    // Validate and truncate input based on field type
    if (name === 'fname' || name === 'lname' || name === 'nationality' || name === 'religion' || name === 'domicile' || name === 'faname' || name === 'qualification_matric' || name === 'qualification_inter' || name === 'qualification_BA' || name === 'qualification_MA' || name === 'qualification_other' || name === 'board_matric' || name === 'board_inter' || name === 'board_ba' || name === 'board_ma' || name === 'board_other') {
      // Allow only alphabetic characters and spaces
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }
    else if (name === 'cnic' || name === 'challan_form') {
      // Allow only numeric characters and truncate to a maximum of 13 digits
      value = value.replace(/\D/g, '').substring(0, 13);
    } else if (name === 'phone' || name === 'fathercnic' || name === 'faphone') {
      // Allow only numeric characters and truncate to a maximum of specific lengths
      const maxLengths = {
        phone: 11,
        fathercnic: 13,
        faphone: 11
      };
      value = value.replace(/\D/g, '').substring(0, maxLengths[name]);
    } else if (name === 'email') {
      // Validate email address
      if (!validateEmail(value)) {
        // If invalid email, set an error message
        setErrors({ ...errors, [name]: 'Invalid email address' });
        return; // Skip updating the input state if email is invalid
      } else {
        // Clear error if email is valid
        setErrors({ ...errors, [name]: '' });
      }
    }

    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return { input, handleChange, setInput, errors };
};

export default useValidationForm;
