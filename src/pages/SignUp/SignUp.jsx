import React, { useState } from 'react';
import axios from 'axios';
import './signUp.css';  // Ensure the CSS is imported

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
            // Save JWT token to localStorage or cookies if needed
            localStorage.setItem('token', response.data.token);
            alert('User registered successfully');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <p>{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
                <a href="/login">Already have an account? Login here</a>
            </div>
        </div>
    );
};

export default Signup;
