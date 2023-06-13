import { authService } from './authService';

export default function withSession() {
  return async () => {
    try {
      const session = await authService.getSession();
      const contextWithSession = {
        session,
      };
      return contextWithSession;
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  };
}
