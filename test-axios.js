const axios = require('axios');

async function test() {
    try {
        await axios.post('http://localhost:5000/api/auth/login', { email: 'wrong@example.com', password: 'wrong' });
    } catch (err) {
        console.log('Error caught! Extracted message:');
        console.log(err.response?.data?.message || 'Login failed');
    }
}

test();
