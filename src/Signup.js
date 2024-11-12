import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importez useNavigate
import './css/signup.css'; // Importation du fichier CSS
import SignUpImage from './images/nutri.png'; // Chemin vers l'image



function Signup() {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Déclarez la fonction de navigation

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email, fullname, gender, password };
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/accounts/signup/', data);
            
            if (response && response.data) {
                setMessage(response.data.message);
                if (response.data.message === 'Inscription réussie !') {
                    navigate('/');  // Redirigez après une inscription réussie
                }
            } else {
                setMessage("Erreur inconnue, la réponse est mal formée.");
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            
            if (error.response && error.response.data) {
                setMessage(error.response.data.message); // Afficher le message d'erreur
            } else {
                setMessage("Une erreur est survenue.");
            }
        }
    };

    return (
        <div >
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
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        id="fullname"
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
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
                <button type="submit">Sign Up</button>
                <p>{message}</p>
            <div className="signup-link">
                    <p>If you don't have an account, <a href="/">Sign in</a></p>
                </div>
            </form>
           
        </div>
    );
}

export default Signup;
