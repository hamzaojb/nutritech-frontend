import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/signin.css'; // Importation du fichier CSS
import SignUpImage from './images/nutri.png'; // Chemin vers l'image


function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email, password };

        try {
            const response = await axios.post('http://127.0.0.1:8000/accounts/signin/', data);
            setMessage(response.data.message);
            if (response.data.message === 'Connexion réussie !') {
                navigate('/home');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Une erreur est survenue");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <img src={SignUpImage} alt="Sign Up" style={{ width: '150px', marginBottom: '20px' }} />
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
                <p>{message}</p>
                <div className="signup-link">
                    <p>If you don't have an account, <a href="/signup">Sign up</a></p>
                </div>

            </form>
        </div>
    );
}

export default Signin;
