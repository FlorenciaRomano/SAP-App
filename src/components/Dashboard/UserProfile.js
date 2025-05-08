import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MediaControlCard from '../Layout/cards';

const UserProfile = () => {
  const { user, role } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState(null);


  
  const handleSave = () => {
    setMessage('Perfil actualizado correctamente.');
  };

  if (!user) {
    return <p>Cargando perfil...</p>;


  }

  return (
    <>
      <div className="mainContent"> {/* Ajuste padding para evitar overlay con navbar */}
        {role === 'admin' ? (
          <h2>Panel de Administrador</h2>
        ) : (
          <h2>Panel Usuario</h2> // O puedes dejarlo vacío o mostrar otro mensaje
        )}
      </div>

      <div className='containerProfile'>
  <MediaControlCard className="contenedorTarjeta" />
  
        <div className="profile-container">
          <h2>Mi Perfil</h2>
          <div className="form-grid">
            <label> 
              Nombre:
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value="admin@example.com" disabled />
            </label>
            <label>
              Teléfono:
              <input type="text" value="+1234567890" />
            </label>
            <label>
              Estudios:
              <input type="text" value="Licenciatura en Ciencias" disabled />
            </label>
            <label>
              Experiencia:
              <input type="text" value="5 años en gestión" disabled />
            </label>
            <label>
              Rol:
              <input type="text" value="admin" disabled />
            </label>
            <label>
                Contraseña:
                <input
                  type="password" value="admin123" disabled
                />
              </label>
              <label>
                Cambiar Contraseña:
                <input
                  type="password"
                />
              </label>
          </div>
          <button onClick={handleSave}>Guardar</button>
          {message && <p className="success">{message}</p>}
        </div>
      </div>


      <style>{`

          .containerProfile{
               display: flex;
                 max-width: 600px!important;
                    margin: 1rem auto!;
                              }
      

      h2{
       text-align:center;
       }

        .mainContent {
        height: 4.5rem;
        padding-top: 40px;
         font-size: 20px;
         background: #cccccc29;
         display: flex;
         justify-content: center;
        }
        /* Ajustes responsive para el padding-left según ancho pantalla */
        @media (max-width: 1199px) {
          .mainContent {
          
          }
        }
        @media (max-width: 767px) {
          .mainContent {
            padding-left: 0;
            margin-top: 10rem
          }
        }

        .containerProfile {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: flex-start;
          margin: 1rem auto;
            gap: 1.5rem;
            max-width: 600px !important
        }
        .contenedorTarjeta {
          flex: 1;
          margin-right: 1rem;
          max-width: 30%;
        }
        .profile-container {
         
          max-width: 600px;
          padding: 10px;
          box-shadow: 0 0 4px rgb(156, 163, 175);
          border-radius: 6px;
          background: #fff;
          display: flex;
          flex-direction: column;
        }
          .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Dos columnas */
          gap: 0.5rem; /* Espacio entre los campos */
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 600;
        }
        input {
          margin-top: 0.2rem;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 0.6rem 1rem;
          font-size: 1rem;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          align-self: flex-start;
          margin-top: 0.5rem;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
        }
        .success {
          margin-top: 1rem;
          color: green;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .containerProfile {
            flex-direction: column;
            display: flex;
            align-items: center;
          }
          .contenedorTarjeta {
            margin-right: 0;
            margin-bottom: 1rem;
            max-width: 100%;
            width: 100%;
          }

          }
          .profile-container {
            width: 80%;
            gap: 1rem;
          }
          button {
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .profile-container {
            margin: 1rem 0.5rem;
          }
          input {
            font-size: 0.9rem;
          }
          button {
            padding: 0.5rem;
            font-size: 0.9rem;
          }
        }
        @media (min-width: 1920px) {
          /* Adaptación para pantallas grandes 4K */
          .containerProfile {
            margin: 1rem auto;
            gap: 1.5rem;
            max-width: 600px !important
          }
          .contenedorTarjeta {
            margin-right: 1.5rem;
            flex: 1;
            max-width: 30%;
          }
          .profile-container {
            max-width: 800px;
          }
        }
      `}</style>
    </>
  );
};

export default UserProfile;
