import axios from 'axios';

const API_URL = 'https://demo-deploy1-g2kn.onrender.com/api/auth';

class AuthService {
  login(username, password) {
    return axios.post(API_URL + '/signin', {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      if (response.data.token) {  // Changed from accessToken to token
        localStorage.setItem('user', JSON.stringify(response.data));
        // Set default authorization header for future requests
        this.setAuthHeader(response.data.token);
      }
      return response.data;
    })
    .catch(error => {
      let errorMessage = 'Login failed';
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.response.status === 403) {
          errorMessage = 'Access forbidden. Check your credentials.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Check your network connection.';
      }
      throw new Error(errorMessage);
    });
  }

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  logout() {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  register(username, password) {
    return axios.post(API_URL + '/signup', {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
