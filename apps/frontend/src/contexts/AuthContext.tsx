/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Credencials, authService } from '../services/auth/authService';
import { tokenService } from '../services/auth/tokenService';

type Props = {
  children: ReactNode;
};

type AuthContextProps = {
  currentUser?: Credencials | false;
  loading: boolean;
  signin: (email: string, password: string) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: false,
  loading: false,
  signin: () => {},
  signout: () => {},
});

export function AuthProvider({ children }: Props): ReactElement<Props> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      return await authService
        .login({ email, password })
        .then(async (response) => {
          // console.log('response', response);
          try {
            const user = await authService.getSession();
            setCurrentUser(user);
            navigate('/');
          } catch (error) {
            setCurrentUser(false);
          }
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
          console.log(error.message);
        });
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setLoading(true);
      tokenService.delete();
      setCurrentUser(false);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authService
      .getSession()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
