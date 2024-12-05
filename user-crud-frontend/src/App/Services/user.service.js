import axios from 'axios';

const apiUrl = 'http://localhost:5500/api/user';

const UserService = {

    // User login function (removed token handling)
    userlogin: (data) => {
        return axios.post(`${apiUrl}/authenticate`, data)
            .then(response => {
                return response.data; // No token handling here
            })
            .catch(error => {
                console.error('Error during login:', error);
                throw error;
            });
    },

    // Function to add a new user
    addNewUser: (data) => {
        // Add userId from localStorage to the data (if needed)
        data.userId = localStorage.getItem('userId');
    
        // Send a POST request to add a new user
        return axios.post(apiUrl, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error adding new user:', error);
                throw error;
            });
    },

    // Function to fetch all users list (no token)
    getAllUsersList: () => {
        return axios.get(apiUrl)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching all users:', error);
                throw error;
            });
    },

    // Function to delete a user
    deleteUser: (id) => {
        return axios
            .delete(`${apiUrl}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting user:', error);
                throw error;
            });
    },
    

    // Function to get a single user detail
    getUserDetail: (id) => {
        return axios.get(`${apiUrl}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching user detail:', error);
                throw error;
            });
    },

    // Function to update a user
    updateUser: (data, id) => {
        data.userId = localStorage.getItem('userId');
        return axios.put(`${apiUrl}/${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating user:', error);
                throw error;
            });
    },
};

export default UserService;
