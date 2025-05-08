/**
 * Simulación de API SAP con datos mock para pruebas frontend
 */

const mockUsersInitial = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '+1234567890',
      role: 'admin',
      estudios: 'Licenciatura en Ciencias',
      experiencia: '5 años en gestión',
      password: '',
    },
    {
      id: 2,
      name: 'User One',
      email: 'user1@example.com',
      phone: '+0987654321',
      role: 'user',
      estudios: 'Diplomado en Marketing',
      experiencia: '2 años en ventas',
      password: '',
    },
    {
      id: 3,
      name: 'User Two',
      email: 'user2@example.com',
      phone: '+1122334455',
      role: 'user',
      estudios: 'Ingeniería en Sistemas',
      experiencia: '3 años en desarrollo',
      password: '',
    },
  ];
  
  // Simular latencia en ms
  const SIMULATED_DELAY = 500;
  
  /**
   * Función auxiliar para simular async con retraso
   * @param {any} data Datos a devolver
   * @param {number} delay Tiempo en ms
   * @returns {Promise<any>}
   */
  function simulateAsync(data, delay = SIMULATED_DELAY) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  }
  
  /**
   * Obtiene la lista de usuarios (mock)
   * @returns {Promise<array>}
   */
  export async function getUsers() {
    return simulateAsync(mockUsersInitial);
  }
  
  /**
   * Crea un nuevo usuario (mock)
   * @param {object} user Nuevo usuario sin id
   * @returns {Promise<object>} Usuario creado con id asignado
   */
  export async function createUser(user) {
    const newUser = {
      id: mockUsersInitial.length + 1,
      ...user,
    };
    mockUsersInitial.push(newUser);
    return simulateAsync(newUser);
  }
  
  /**
   * Obtiene un usuario por id (mock)
   * @param {number} id Id del usuario
   * @returns {Promise<object|null>}
   */
  export async function getUserById(id) {
    const user = mockUsersInitial.find(u => u.id === id) || null;
    return simulateAsync(user);
  }
  
  /**
   * Actualiza un usuario (mock)
   * @param {number} id Id del usuario
   * @param {object} updates Cambios a aplicar
   * @returns {Promise<object|null>} Usuario actualizado o null si no existe
   */
  export async function updateUser(id, updates) {
    const index = mockUsersInitial.findIndex(u => u.id === id);
    if (index === -1) return simulateAsync(null);
    mockUsersInitial[index] = { ...mockUsersInitial[index], ...updates };
    return simulateAsync(mockUsersInitial[index]);
  }
  
  /**
   * Borra un usuario por id (mock)
   * @param {number} id Id del usuario
   * @returns {Promise<boolean>} true si eliminado, false si no existe
   */
  export async function deleteUser(id) {
    const index = mockUsersInitial.findIndex(u => u.id === id);
    if (index === -1) return simulateAsync(false);
    mockUsersInitial.splice(index, 1);
    return simulateAsync(true);
  }
