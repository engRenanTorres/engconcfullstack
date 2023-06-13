const getEnv = {
  backendAdress: () => {
    const environment = process.env.REACT_APP_ENV;
    if (environment === 'PROD') return process.env.REACT_APP_BACKEND_PROD;
    if (environment === 'TEST') return process.env.REACT_APP_BACKEND_TEST;
    return process.env.REACT_APP_BACKEND_DEV;
  },
};

export default getEnv;
