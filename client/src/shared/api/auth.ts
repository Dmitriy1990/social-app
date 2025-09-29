import API from '../../app/api';
import { ENDPOINTS } from '../lib';

type AuthApi = {
  login: (username: string, password: string) => Promise<any>;
  register: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  profile: () => Promise<any>;
};

export const authApi: AuthApi = {
  login: (username, password) => API.post(ENDPOINTS.AUTH.LOGIN, { username, password }),
  register: (username, password) => API.post(ENDPOINTS.AUTH.REGISTER, { username, password }),
  logout: () => API.post(ENDPOINTS.AUTH.LOGOUT),
  profile: () => API.get(ENDPOINTS.USER.PROFILE),
};
