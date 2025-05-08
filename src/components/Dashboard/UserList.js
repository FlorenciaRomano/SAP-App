import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUsers, createUser, updateUser, deleteUser as apiDeleteUser } from '../Services/Api';

const UserList = () => {
  const { role } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
    estudios: '',
    experiencia: '',
    role: 'user',
  });

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    estudios: '',
    experiencia: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditUserId(user.id);
    setEditUserData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      estudios: user.estudios,
      experiencia: user.experiencia,
      role: user.role,
    });
    setShowEditUserModal(true);
  };

  const saveEdit = async () => {
    if (editUserData.name.trim() === '') {
      alert('El nombre no puede estar vacío');
      return;
    }
    if (editUserData.email.trim() === '') {
      alert('El email no puede estar vacío');
      return;
    }

    await updateUser(editUserId, editUserData);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setEditUserId(null);
    setEditUserData({
      name: '',
      email: '',
      phone: '',
      estudios: '',
      experiencia: '',
      role: 'user',
    });
    setShowEditUserModal(false);
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditUserData({
      name: '',
      email: '',
      phone: '',
      estudios: '',
      experiencia: '',
      role: 'user',
    });
    setShowEditUserModal(false);
  };

  const deleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      await apiDeleteUser(id);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      if (editUserId === id) {
        cancelEdit();
      }
    }
  };

  const addUser = async () => {
    if (
      newUserData.name.trim() === '' ||
      newUserData.email.trim() === '' ||
      newUserData.phone.trim() === '' ||
      newUserData.estudios.trim() === '' ||
      newUserData.experiencia.trim() === '' ||
      newUserData.password.trim() === '' ||
      newUserData.confirmPassword.trim() === ''
    ) {
      alert('Por favor completa todos los campos');
      return;
    }
    if (newUserData.password !== newUserData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const emailExists = users.some(u => u.email.toLowerCase() === newUserData.email.trim().toLowerCase());
    if (emailExists) {
      alert('Ya existe un usuario con ese email');
      return;
    }

    const userToCreate = {
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      phone: newUserData.phone.trim(),
      estudios: newUserData.estudios.trim(),
      experiencia: newUserData.experiencia.trim(),
      role: newUserData.role,
      password: newUserData.password.trim(),
    };

    await createUser(userToCreate);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);

    setNewUserData({
      name: '',
      email: '',
      phone: '',
      estudios: '',
      experiencia: '',
      role: 'user',
      password: '',
      confirmPassword: '',
    });

    setShowAddUserModal(false);
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setShowUserModal(false);
  };

  if (role !== 'admin') {
    return <p>No tienes permisos para ver esta sección.</p>;
  }

  return (
    <>
      <div className="gestionUser">
        <div>
          <h2>Gestión de Usuarios</h2>
        </div>
        <div>
          <button
            className="btn-add-user"
            onClick={() => setShowAddUserModal(true)}
            aria-haspopup="dialog"
            aria-expanded={showAddUserModal}
          >
            Agregar Usuario
          </button>
        </div>
      </div>

      <div className="user-list-container">
        <table className="user-list" aria-label="Lista de usuarios">
          <thead>
            <tr>
              <th>Usuario</th>
              </tr>
              <tr>
              <th>Mail</th>
              </tr>
              <tr>
              <th>Rol</th>
              </tr>
              <tr>
              <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="user-item">
                <td>
                  <span className="user-icon"> 👤 </span>
                  <span className="user-name">{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                    {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                  </span>
                </td>
                <td className="user-actions">
                  <button
                    onClick={() => openUserModal(user)}
                    aria-label={`Ver detalles de ${user.name}`}
                    className="btn-eye"
                    title="Ver detalles"
                    type="button"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => startEdit(user)}
                    aria-label={`Editar ${user.name}`}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    aria-label={`Eliminar ${user.name}`}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar usuario */}
      {showAddUserModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="addUserTitle" tabIndex={-1}>
          <div className="modal-content">
            <h3 id="addUserTitle">Agregar Nuevo Usuario</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                addUser();
              }}
              className="formModal2"
            >
              <label>
                Nombre:
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={e => setNewUserData({ ...newUserData, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={newUserData.email}
                  onChange={e => setNewUserData({ ...newUserData, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="tel"
                  value={newUserData.phone}
                  onChange={e => setNewUserData({ ...newUserData, phone: e.target.value })}
                  required
                  placeholder="+1234567890"
                />
              </label>
              <label>
                Estudios:
                <input
                  type="text"
                  value={newUserData.estudios}
                  onChange={e => setNewUserData({ ...newUserData, estudios: e.target.value })}
                  required
                />
              </label>
              <label>
                Experiencia:
                <input
                  type="text"
                  value={newUserData.experiencia}
                  onChange={e => setNewUserData({ ...newUserData, experiencia: e.target.value })}
                  required
                />
              </label>
              <label>
                Rol:
                <select
                  value={newUserData.role}
                  onChange={e => setNewUserData({ ...newUserData, role: e.target.value })}
                  required
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
              <label>
                Contraseña:
                <input
                  type="password"
                  value={newUserData.password}
                  onChange={e => setNewUserData({ ...newUserData, password: e.target.value })}
                  required
                />
              </label>
              <label>
                Confirmar Contraseña:
                <input
                  type="password"
                  value={newUserData.confirmPassword}
                  onChange={e => setNewUserData({ ...newUserData, confirmPassword: e.target.value })}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="btn-save-user">Agregar</button>
                <button
                  type="button"
                  className="btn-cancel-user"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {showEditUserModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="editUserTitle" tabIndex={-1}>
          <div className="modal-content">
            <h3 id="editUserTitle">Editar Usuario</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                saveEdit();
              }}
              className="formModal2"
            >
              <label>
                Nombre:
                <input
                  type="text"
                  value={editUserData.name}
                  onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={editUserData.email}
                  onChange={e => setEditUserData({ ...editUserData, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="tel"
                  value={editUserData.phone}
                  onChange={e => setEditUserData({ ...editUserData, phone: e.target.value })}
                  required
                  placeholder="+1234567890"
                />
              </label>
              <label>
                Estudios:
                <input
                  type="text"
                  value={editUserData.estudios}
                  onChange={e => setEditUserData({ ...editUserData, estudios: e.target.value })}
                  required
                />
              </label>
              <label>
                Experiencia:
                <input
                  type="text"
                  value={editUserData.experiencia}
                  onChange={e => setEditUserData({ ...editUserData, experiencia: e.target.value })}
                  required
                />
              </label>
              <label>
                Rol:
                <select
                  value={editUserData.role}
                  onChange={e => setEditUserData({ ...editUserData, role: e.target.value })}
                  required
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
              <label>
                Contraseña:
                <input
                  type="password"
                  value="admin123"
                  disabled
                />
              </label>
              <label>
                Cambiar Contraseña:
                <input
                  type="password"
                  // You could add state and implementation here if desired
                />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="btn-save-user">Guardar</button>
                <button
                  type="button"
                  className="btn-cancel-user"
                  onClick={cancelEdit}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para mostrar detalles del usuario */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="userDetailsTitle" tabIndex={-1}>
          <div className="modal-content">
            <h3 id="userDetailsTitle">Detalles de {selectedUser.name}</h3>
            <ul className="user-details-list">
              <li><strong>Email:</strong> {selectedUser.email}</li>
              <li><strong>Teléfono:</strong> {selectedUser.phone}</li>
              <li><strong>Estudios:</strong> {selectedUser.estudios}</li>
              <li><strong>Experiencia:</strong> {selectedUser.experiencia}</li>
              <li><strong>Rol:</strong> {selectedUser.role}</li>
            </ul>
            <button onClick={closeUserModal} className="btn-close-modal" aria-label="Cerrar Detalles">
              Cerrar
            </button>
          </div>
        </div>
      )}

      <style>{`
        .gestionUser {
          height: 9rem;
          display: flex;
          justify-content: space-evenly;
          align-items: flex-end;
        }
        .user-list-container {
          width: 100%;
          max-width: 800px;
          margin: 1rem auto;
          padding: 1rem;
          box-shadow: 0 0 12px rgba(0,0,0,0.1);
          border-radius: 8px;
          background: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #222;
        }
        .btn-add-user {
          display: block;
          margin: 0 auto 1rem;
          padding: 0.5rem 1rem;
          background-color: #4141ff;
          border: none;
          border-radius: 5px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn-add-user:hover {
          background-color: #0000ab;
        }
        .user-list {
          width: 100%;
          border-collapse: collapse;
        }
        .user-list th, .user-list td {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 1px solid #eee;
        }
        .user-item {
          vertical-align: middle;
          display: flex;
          justify-content: space-between;
        }
        .user-icon {
          margin-right: 0.5rem;
        }
        .user-name {
          font-weight: 700;
          color: #444;
        }
        .user-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        button {
          font-weight: 600;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          padding: 0.4rem 0.9rem;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
          color: white;
        }
        .btn-edit {
          background-color: #17a2b8;
        }
        .btn-edit:hover {
          background-color: #117a8b;
        }
        .btn-delete {
          background-color: #dc3545;
        }
        .btn-delete:hover {
          background-color: #a71d2a;
        }
        .btn-eye {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.3rem;
          color: #007bff;
          padding: 0;
          transition: color 0.3s ease;
        }
        .btn-eye:hover {
          color: #0056b3;
        }
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          width: 70%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-height: 90vh;
          overflow-y: auto;
        }
        @media (max-width: 320px) {
          .modal-content {
            max-height: 90vh;
            width: 95%;
            padding: 15px;
          }
        }
        .modal-content h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          text-align: center;
          color: #222;
          font-size: 1.25rem;
        }
        form label {
          display: block;
          margin-bottom: 0.7rem;
          font-weight: 500;
          font-size: 0.9rem;
        }
        form input,
        form select {
          width: 100%;
          padding: 0.45rem;
          font-size: 0.9rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          margin-top: 0.25rem;
          margin-bottom: 0.9rem;
          font-family: inherit;
        }
        form input:focus,
        form select:focus {
          border-color: #80bdff;
          outline: none;
        }
        .modal-buttons {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        .btn-save-user {
          flex: 1;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          font-weight: 600;
          padding: 0.45rem 0;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease;
        }
        .btn-save-user:hover {
          background-color: #0056b3;
        }
        .btn-cancel-user {
          flex: 1;
          background-color: #6c757d;
          color: white;
          border-radius: 5px;
          font-weight: 600;
          padding: 0.45rem 0;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease;
        }
        .btn-cancel-user:hover {
          background-color: #565e64;
        }
        .user-details-list {
          list-style: none;
          padding-left: 0;
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: #444;
        }
        .user-details-list li {
          margin-bottom: 0.5rem;
        }
        .btn-close-modal {
          display: block;
          margin: 0 auto;
          background-color: #dc3545;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease;
        }
        .btn-close-modal:hover {
          background-color: #a71d2a;
        }
        @media (max-width: 480px) {
          .user-list-container {
            padding: 0.5rem;
          }
          .user-list th, .user-list td {
            padding: 0.5rem 0.25rem;
          }
          .user-actions {
            flex-wrap: wrap;
            gap: 0.25rem;
          }
          .modal-content {
            width: 95%;
          }
          .modal-buttons {
            flex-direction: column;
          }
          .modal-buttons button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default UserList;
