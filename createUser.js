const axios = require('axios');

axios.post('http://localhost:3000/users', {
    username: "john_doe",
    email: "john@example.com",
    passwordHash: "hashed_password"
})
.then(response => console.log('User created:', response.data))
.catch(error => console.error('Error:', error));
