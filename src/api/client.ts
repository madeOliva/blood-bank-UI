// frontend/src/api/client.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL de tu backend NestJS
  timeout: 5000,
  withCredentials: true, // Si usas cookies/tokens
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response.data, // Devuelve solo los datos en caso de éxito
  (error) => {
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      const message = error.response.data?.message || 'Error desconocido';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // No hubo respuesta del servidor
      return Promise.reject(new Error('No se pudo conectar al servidor'));
    } else {
      // Error en la configuración de Axios
      return Promise.reject(new Error('Error en la solicitud'));
    }
  }
);

export default api;