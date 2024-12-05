import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Breadcrumb from './App/Breadcrumb/Breadcrumb';
import ListComponent from './App/User/UserList';
import AddUsers from './App/User/AddUsers';
import UsersDetailComponent from './App/User/userEditDetail'; 
import './App/Style/style.css';

const App = () => {
  return (
    <Router>
      <Breadcrumb /> {/* Always show Breadcrumb */}
      <Routes>
        {/* Default route redirects to /users */}
        <Route path="/" element={<Navigate to="/users" />} />

        {/* Routes for logged-in users */}
        <Route path="/users" element={<ListComponent />} />
        <Route path="/users/users_detail/:id" element={<UsersDetailComponent />} />
        <Route path="/users/add_user" element={<AddUsers />} />
      </Routes>
    </Router>
  );
};

export default App;



