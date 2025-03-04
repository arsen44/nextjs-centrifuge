// axiosSetup.ts
import axios from 'axios';
import { store } from '../store/creatReducer';
import { fetchRefreshTokenRequest } from '../store/actions/auth';

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        // Диспатчим action для обновления токена через saga
        store.dispatch(fetchRefreshTokenRequest());
        
        // Ждем обновления токена в store
        const newToken = await new Promise((resolve) => {
          const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.auth?.token) {
              unsubscribe();
              resolve(state.auth.token);
            }
          });
        });

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};