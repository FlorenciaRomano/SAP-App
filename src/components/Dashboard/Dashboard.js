import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';
import UserProfile from './UserProfile';
import Navbar from '../Layout/Navbar';

const Dashboard = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, navigate]);

    if (loading) return <div>Cargando...</div>;

    return (
   
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Bienvenido, {user.name}</h1>
                <button onClick={() => {
                    logout();
                    navigate('/login');
                }}>Cerrar sesión</button>
            </header>
            <Navbar/>
            <main className="dashboard-main">
                {user.role === 'admin' ? (
                    <>
                        <h2>Panel de Admin</h2>
                        <UserList />
                    </>
                ) : (
                    <>
                        <h2>Mi Perfil</h2>
                        <UserProfile user={user} />
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
