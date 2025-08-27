import { createContext, useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

type User = { userID: number; username: string };
type AuthState = "loading" | "authenticated" | "anonymous";

type Ctx = {
  state: AuthState;
  user: User | null;
  login: (vars: { userValue: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refetchMe: () => Promise<void>;
};
const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();

  const me = useQuery({
    queryKey: ["me"],
    queryFn: () => api<{ authenticated: boolean; user?: User }>("/auth/me"),
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation<
    { user: User },
    Error,
    { userValue: string; password: string }
  >({
    mutationFn: (vars) =>
      api<{ user: User }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: () => api("/auth/logout", { method: "POST" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });

  const value = useMemo<Ctx>(() => {
    const loading = me.isLoading || me.isPending;
    const authed = !!me.data?.authenticated && !!me.data?.user;

    return {
      state: loading ? "loading" : authed ? "authenticated" : "anonymous",
      user: authed ? (me.data!.user as User) : null,

      // return Promise<void>
      login: async (vars) => {
        await loginMutation.mutateAsync(vars);
      },

      logout: async () => {
        await logoutMutation.mutateAsync();
      },

      refetchMe: async () => {
        await qc.invalidateQueries({ queryKey: ["me"] });
      },
    };
  }, [me.isLoading, me.isPending, me.data, loginMutation, logoutMutation, qc]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
