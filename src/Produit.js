import React, { useState, useEffect } from 'react';
import './css/produit.css'; // Importation du fichier CSS
import Navbar from './components/Navbar';

export const Produit = () => {
    const [produits, setProduits] = useState([]);
    const [nom, setNom] = useState('');
    const [image, setImage] = useState(null);
    const [prix, setPrix] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Contrôle de l'état de la modal

    // Récupérer la liste des produits
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/produits/');
                const data = await response.json();
                setProduits(data.produits);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };
        fetchProduits();
    }, []);

    // Ajouter un produit
   
    // Fermer la modal sans enregistrer
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNom('');
        setPrix('');
        setImage(null);
        setMessage('');
    };

    // Fonction pour ouvrir la modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <Navbar onOpenModal={openModal} />

            

            {/* Liste des produits */}
            <h2 style={{ color: 'white' }}>Liste des Produits</h2>
            <div className="produit-cards">
                {produits.map((produit) => (
                    <div className="produit-card" key={produit.id}>
                        <div className="produit-image">
                            {produit.image_url && (
                                <img
                                    src={`http://127.0.0.1:8000${produit.image_url}`} // Chemin de l'image
                                    alt={produit.nom}
                                    className="produit-img"
                                />
                            )}
                        </div>
                        <div className="produit-info">
                            <strong>{produit.nom}</strong>
                            <p>{produit.prix} DH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
