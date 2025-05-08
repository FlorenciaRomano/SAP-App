import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user', name: 'Normal User' },
];

// Función que simula una API de autenticación
const authenticate = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        // Crear token simulado: base64 JSON con datos usuario (sin seguridad real)
        const token = btoa(
          JSON.stringify({ id: user.id, email: user.email, role: user.role, name: user.name })
        );
        resolve(token);
      } else {
        reject('Credenciales inválidas');
      }
    }, 700);
  });

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = await authenticate({ email, password });
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Bienvenidx!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Validando...' : 'Iniciar Sesión'}
        </button>
        {error && <p className="error">{error}</p>}

        <ul> Credenciales de prueba:
          <li>Admin: admin@example.com / admin123</li>
          <li>Usuario: user@example.com / user123</li>
        </ul>

      </form>

      <style>{`
        .login-container {
          max-width: 350px;
          margin: 2rem auto;
          padding: 1rem;
          box-shadow: 0 0 6px gray;
          border-radius: 5px;
          background: #fff;
        }
        .login-container h2 {
          text-align: center;
          margin-bottom: 1rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .login-form input {
          margin-bottom: 1rem;
          padding: 0.55rem;
          font-size: 13px;
           border: none; /* <-- This thing here */
      border:solid 1px #ccc;
      border-radius: 5px;
         
        }
        .login-form button {
          padding: 0.75rem;
          font-size: 15px;
          cursor: pointer;
          background-color: #335eff ;
          color: white;
          border: none;
          border-radius: 5px;
            font-family: Arial;
        }
        .login-form button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
        .error {
          color: red;
          margin-top: 0.5rem;
          text-align: center;
        }

        @media (max-width: 600px) {
          .login-container {
            margin: 1rem;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
