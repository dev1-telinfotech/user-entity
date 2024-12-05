import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserService from '../Services/user.service.js';
import Swal from 'sweetalert2';
import { TextField, Button } from '@mui/material';
import './UserEditDetail.css';

const UsersDetailComponent = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    dob: '',  // Corrected the reference to dob
  });
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to track update success

  useEffect(() => {
    getUserDetail(id);
  }, [id, updateSuccess]); // Add updateSuccess to dependency array

  const getUserDetail = (userId) => {
    UserService.getUserDetail(userId)
      .then((res) => {
        setUserDetail(res);
        setUserData({
          first_name: res.first_name,
          last_name: res.last_name,
          dob: res.dob,  // Correctly set dob here
        });
      })
      .catch((error) => {
        console.error('Error fetching user detail:', error);
      });
  };

  const updateUser = () => {
    UserService.updateUser(userData, id)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Your Record Updated Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setUpdateSuccess(!updateSuccess); // Toggle state to trigger re-fetch
      })
      .catch((error) => {
        const errorMessage = error.error.message || 'Something went wrong';
        Swal.fire({
          title: 'Error!!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    };

    const formattedDate = new Date(dateTimeString).toLocaleString('en-IN', options);
    return formattedDate.replace(',', ''); // Remove the comma after the date
  };

  return (
    <div className="users-detail-container">
      <form className="user-card">
        <div className="user-detail-row">
          <div className="user-detail-label">First Name:</div>
          <TextField
            variant="outlined"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-detail-row">
          <div className="user-detail-label">Last Name:</div>
          <TextField
            variant="outlined"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="user-detail-row">
          <div className="user-detail-label">Email:</div>
          <span>{userDetail.email}</span>
        </div>

        <div className="user-detail-row">
          <div className="user-detail-label">Date Of Birth:</div>
          <TextField
            variant="outlined"
            name="dob"
            type="date"  // Correct type for date input
            value={userData.dob}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,  // Ensures the label is properly aligned when date is selected
            }}
          />
        </div>

        <div className="user-detail-row">
          <div className="user-detail-label">Created At:</div>
          <span>{formatDateTime(userDetail.createdAt)}</span>
        </div>

        <div className="user-detail-row">
          <div className="user-detail-label">Updated At:</div>
          <span>{formatDateTime(userDetail.updatedAt)}</span>
        </div>

        <div className="button-group">
          <div className="button-wrapper">
            <Button
              variant="contained"
              color="primary"
              onClick={updateUser}
            >
              Update
            </Button>
          </div>
          <div className="button-wrapper">
            <Button
              component={Link}
              to="/users"
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UsersDetailComponent;
