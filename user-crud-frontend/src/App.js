import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Breadcrumb from './App/Breadcrumb/Breadcrumb';
import ListComponent from './App/User/UserList';
import AddUsers from './App/User/AddUsers';
import UsersDetailComponent from './App/User/userEditDetail'; 
import './App/Style/style.css';

const App = () => {
  useEffect(() => {
    // Check if user is logged in by checking localStorage for necessary data
    const email = localStorage.getItem('email');
    if (!email) {
      // If not logged in, redirect to login page
      window.location.href = "/";
    }
  }, []);

  return (
    <Router>
      <Breadcrumb /> {/* Always show Breadcrumb */}
      <Routes>
        {/* Routes for logged-in users */}
        <Route path="/users" element={<ListComponent />} />
        <Route path="/users/users_detail/:id" element={<UsersDetailComponent />} />
        <Route path="/users/add_user" element={<AddUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
