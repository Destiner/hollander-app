interface EnvMeta {
  env: {
    VITE_ALCHEMY_KEY: string;
  };
}

interface EnvironmentVariables {
  alchemyKey: string;
}

function useEnv(): EnvironmentVariables {
  const env = (import.meta as unknown as EnvMeta).env;
  return {
    alchemyKey: env.VITE_ALCHEMY_KEY || '',
  };
}

export default useEnv;
