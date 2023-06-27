export interface User {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  password?: string;
  roles: 1 | 2 | 3;
}
