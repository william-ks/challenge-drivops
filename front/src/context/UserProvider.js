import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import api from "../service/api";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = usePersistedState("user", null);
  const [token, setToken] = usePersistedState("token", null);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  const login = async (form) => {
    try {
      const { data } = await api.post("/login", { ...form });

      setUser({ name: data.name });
      setToken(data.token);
    } catch (e) {
      throw e;
    }
  };

  const data = {
    user,
    headers,
    login,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserContext;
