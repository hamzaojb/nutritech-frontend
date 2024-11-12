import React, { useState, useEffect } from 'react';

const EditUserModal = ({ showModal, closeModal, user, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    email: user.email,
    fullname: user.fullname,
    gender: user.gender,
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        email: user.email,
        fullname: user.fullname,
        gender: user.gender,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, updatedUser); // Appel de la fonction updateUser
    closeModal(); // Fermer le modal après la mise à jour
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div >
        
        <form onSubmit={handleSubmit}>
        <h2>Modifier l'utilisateur</h2>
          {/* Email : modifiable */}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
          />
          
          {/* Nom Complet : modifiable */}
          <label>Nom Complet:</label>
          <input
            type="text"
            name="fullname"
            value={updatedUser.fullname}
            onChange={handleInputChange}
          />
          
          {/* Genre : modifiable */}
          <label>Genre:</label>
        <select
            name="gender"
            value={updatedUser.gender}
            onChange={handleInputChange}
            >
            <option value="M">Male</option>
            <option value="F">Female</option>
            </select>
          
          <div className="modal-actions">
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={closeModal}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
