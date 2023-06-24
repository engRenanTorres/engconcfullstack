// import getEnv from '../../utils/getEnv';
import axiosClient from '../../utils/httpClient/axiosClient';
import { tokenService } from './tokenService';

export type Body = {
  valid: boolean;
  credencials: {
    id: string;
    name: string;
    email: string;
    roles: number;
  };
};

export type Credencials = {
  id: string;
  name: string;
  email: string;
  roles: number;
};

type LoginBody = { email: string; password: string };
type LoginResponse = { token: string };

export const authService = {
  async login({ email, password }: LoginBody) {
    return axiosClient
      .post<LoginResponse>('/auth/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.status !== 200)
          throw new Error('Usuário ou senha inválidos');
        const body = response.data;
        if (body.token) tokenService.save(body.token);
        // console.log(body);
      });
  },
  async getSession(): Promise<Credencials | false> {
    return axiosClient.get('/auth/session').then((response) => {
      if (response.status !== 200) {
        throw new Error('Não Autorizado');
      }
      const body = response.data as Body;
      return body.credencials ? body.credencials : false;
    });
  },
};
