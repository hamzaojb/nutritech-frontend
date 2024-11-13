import React from 'react';
import Navbar from './components/Navbar'; // Assurez-vous que le chemin est correct
import './css/LandingPage.css'; // Pour les styles de la page d'accueil
import SignUpImage from './images/nutri.png'; // Chemin vers l'image


const LandingPage = () => {
  return (
    <div >
      {/* Intégration de la Navbar */}
      <Navbar />

      {/* Contenu de la page d'accueil */}
      <div className="logo-container">
      <img className='logo' src={SignUpImage} alt="Sign Up"  />
      </div>

      <div className="text-container">
        <h1 className="main-text">Bienvenue sur NUTRITECH</h1>
        <p className="sub-text">Nous révolutionnons votre manière de prendre soin de votre santé, Innover dans l’agriculture</p>
        <a href="https://nutritechagro.com/" target="_blank" rel="noopener noreferrer">
          <button className="cta-button">Découvrez Plus</button>
        </a>      </div>
    </div>
  );
};

export default LandingPage;
