import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { getUsers } from '../Services/Api'; // Importa la función para obtener usuarios
import { AuthContext } from '../../context/AuthContext'; // Importa el contexto de autenticación

const ContentCards = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext); // Obtiene el rol del usuario desde el contexto
  const [userCount, setUserCount] = useState(0); // Estado para almacenar el número de usuarios

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(); // Llama a la API para obtener usuarios
      setUserCount(users.length); // Actualiza el estado con el número de usuarios
    };

    fetchUsers();
  }, []);

  const handleCardClick = () => {
    navigate('/dashboard/users'); // Cambia la ruta según tu configuración
  };

  // Solo muestra la tarjeta si el rol es 'admin'
  if (role !== 'admin') {
    return null; // No renderiza nada si no es admin
  }

  return (
    <div className='contentCards'>
      <Card
        sx={{
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '10px',
          transition: 'box-shadow 0.2s',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
          },
        }}
        onClick={handleCardClick}
        className='tarjetaUsuarios'
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 200 }}>
          <div
            style={{
              marginTop: '2rem',
              width: 50,
              marginBottom: '1rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(199, 207, 255, 0.555)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 50, height: 50, borderRadius: '50%' }}
              image={require('../assets/users.png')}
              alt="User "
            />
          </div>
          <CardContent sx={{ flex: '0 0 auto' }}>
            <Typography component="div" sx={{ fontSize: '25px' }}>
              Usuarios
            </Typography>
            <Typography component="div" sx={{ fontSize: '20px', color: 'gray', textAlign: 'center' }}>
              {userCount} {/* Muestra el número de usuarios */}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default ContentCards;
