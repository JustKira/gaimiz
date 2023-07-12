import { setCookie } from "cookies-next";
import { ParsedToken, User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

import { useRouter } from "next/navigation";
import { client_auth } from "../firebase";

type AuthContextType = {
  user: User | null;
  claims: ParsedToken | undefined;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  claims: undefined,
  loading: true,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [claims, setClaims] = useState<ParsedToken | undefined>(undefined);
  const router = useRouter();
  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    setLoading(true);

    return client_auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setLoading(false);
        setCookie("token", "");
      } else {
        const token = await user.getIdToken();
        const { claims } = await user.getIdTokenResult(true);
        setUser(user);
        setClaims(claims);
        setLoading(false);
        setCookie("token", token);
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = client_auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, claims }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
