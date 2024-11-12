import React, { useEffect, useState } from 'react';
import './css/home.css'; // Importation du fichier CSS
import Navbar from './components/Navbar';
import EditUserModal from './components/EditUserModal';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fonction pour récupérer les utilisateurs depuis l'API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/accounts/users/')
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);  // Met à jour l'état avec les utilisateurs
        }
      })
      .catch((error) => console.error('Erreur:', error));
  }, []);

  // Fonction pour ouvrir le modal et sélectionner l'utilisateur à modifier
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/accounts/users/${userId}/delete/`, {
          method: 'DELETE',
        });
  
        const data = await response.json();
        if (data.message) {
          alert(data.message); // Affiche le message de succès ou d'erreur
          setUsers(users.filter((user) => user.id !== userId)); // Supprime l'utilisateur de l'état
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };
  

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (userId, updatedUser) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/users/${userId}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message); // Affiche le message de succès ou d'erreur
        setUsers(users.map((user) => (user.id === userId ? { ...user, ...updatedUser } : user)));
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1 style={{color:'white', marginTop:'100px'}}>Liste des Utilisateurs</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom Complet</th>
              <th>Genre</th>
              <th>Actif</th>
              <th>Administrateur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.fullname}</td>
                <td>{user.gender}</td>
                <td>{user.is_active ? 'Oui' : 'Non'}</td>
                <td>{user.is_admin ? 'Oui' : 'Non'}</td>
                <td>
                  <button className='buttonedit' onClick={() => openModal(user)}>Modifier</button>
                  <button className='buttondelete' onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour modifier un utilisateur */}
      {selectedUser && (
        <EditUserModal
          showModal={showModal}
          closeModal={closeModal}
          user={selectedUser}
          updateUser={updateUser}
        />
      )}
    </div>
  );
};

export default Home;
