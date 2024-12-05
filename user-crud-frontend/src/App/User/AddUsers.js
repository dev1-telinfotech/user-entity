import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import './AddUsers.css';
import { Link } from 'react-router-dom';
import UserService from '../Services/user.service.js';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddUsers = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.addNewUser(formData)
      .then((response) => {
        // Handle successful user registration
        console.log('User registration successful:', response.data);
        // Show success message using SweetAlert2
        Swal.fire({
          title: 'User Added Successfully!',
          text: 'Your record has been added.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect after success
          window.location.href = '/users';
        });
      })
      .catch((error) => {
        // Handle registration error
        console.error('User registration failed:', error);
        // Show error message using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'User registration failed. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Add New User</h2>
          <div className="form-field">
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <Box mb={2} />
          <div className="form-field">
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <Box mb={2} />
          <div className="form-field">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              error={!formData.email.includes('@')}
              helperText="Please enter a valid email."
            />
          </div>
          <Box mb={2} />
          <div className="form-field">
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              error={!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(formData.password)}
              helperText="Password must be a combination of lower-case, upper-case, numbers, and at least 8 characters long"
            />
          </div>
          <Box mb={2} />
          <div className="form-field">
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              error={formData.password !== formData.confirmPassword}
              helperText="Passwords do not match."
            />
          </div>
          <Box mb={2} />
          <div className="form-field">
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Box mt={2}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
              <Button
                component={Link}
                to="/users"
                variant="contained"
                color="secondary"
                style={{ fontSize: '14px', padding: '6px 16px' }}
              >
                Cancel
              </Button>
              <Box ml={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !formData.email ||
                    !formData.password ||
                    formData.password !== formData.confirmPassword
                  }
                  style={{
                    marginLeft: '35px',
                    fontSize: '14px',
                    padding: '6px 16px',
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
