import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onOpenModal }) => {
  // State pour la modal et les autres variables
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [produits, setProduits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer l'email de l'utilisateur depuis le localStorage
  const userEmail = localStorage.getItem('email');

  // Si l'email est présent, extraire la partie avant '@'
  const username = userEmail ? userEmail.split('@')[0] : '';

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !prix) {
      setMessage('Tous les champs sont obligatoires.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('image', image);
    formData.append('prix', prix);

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/produits/add/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Produit ajouté avec succès!');
        setNom('');
        setPrix('');
        setImage(null);
        setProduits([...produits, result.produit]); // Ajouter le nouveau produit à la liste
        setIsModalOpen(false); // Fermer la modal après ajout du produit
      } else {
        setMessage(result.message || 'Erreur lors de l\'ajout du produit');
      }
    } catch (error) {
      setMessage('Erreur du serveur : ' + error.message);
    }
  };

  // Fonction pour fermer la modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Modal pour ajouter un produit */}
      {isModalOpen && (
        <div className="modal">
          <div>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <h2>Ajouter un Produit</h2>
                <label>Nom :</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Prix :</label>
                <input
                  type="number"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Image :</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button type="submit">Ajouter le produit</button>
              <button className="cancel-btn" onClick={handleCloseModal}>Annuler</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/home">NUTRITECH</a>
        </div>
        <ul className="navbar-links">
          <li><a href="/landing">Home</a></li>
          <li><a href="/produit">Product</a></li>
          <li><a href="/home">Settings</a></li>
        </ul>
        <div className="navbar-buttons">
          {userEmail ? (
            <>
              <div className="navbar-user-circle">{username}</div>
              <button onClick={() => setIsModalOpen(true)} className="add-product-btn">Add Product</button>
              <a href="/" className="navbar-login">Logout</a>
            </>
          ) : (
            <a href="/signin" className="navbar-login">Login</a>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
