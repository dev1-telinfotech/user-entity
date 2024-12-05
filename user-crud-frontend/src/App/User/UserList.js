import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import Swal from 'sweetalert2';
import UserService from '../Services/user.service.js'; // Update path if necessary

const ListComponent = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Rows per page

  useEffect(() => {
    UserService.getAllUsersList()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Unable to fetch users. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(id)
          .then(() => {
            Swal.fire('Deleted!', 'User successfully deleted.', 'success');
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          })
          .catch((error) => {
            Swal.fire('Error!', 'Unable to delete user.', 'error');
          });
      }
    });
  };

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="user-list-container">
      <div className="user-list-headers" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%', margin: '0 4%' }}>
        <h2>User List</h2>
        <Button
          component={Link}
          to="/users/add_user"
          variant="contained"
          color="primary"
          className="add-user-button"
        >
          Add User
        </Button>
      </div>




      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <Link to={`/users/users_detail/${user.id}`}>
                    <Button variant="contained" color="secondary">
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ListComponent;
