import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { backendUrl } from "../../shared/company";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const stored = localStorage.getItem("auth_token");
		if (!stored) {
			setIsLoading(false);
			return;
		}
		fetch(`${backendUrl}/auth/me`, {
			headers: { Authorization: `Bearer ${stored}` },
		})
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => {
				if (data?.success) {
					setToken(stored);
					setUser(data.user);
				} else {
					localStorage.removeItem("auth_token");
				}
			})
			.catch(() => localStorage.removeItem("auth_token"))
			.finally(() => setIsLoading(false));
	}, []);

	const login = useCallback(async (email, password) => {
		const res = await fetch(`${backendUrl}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		if (!res.ok || !data.success) throw new Error(data.error || "Login failed");
		localStorage.setItem("auth_token", data.token);
		setToken(data.token);
		setUser(data.user);
		return data;
	}, []);

	const register = useCallback(async (name, email, password) => {
		const res = await fetch(`${backendUrl}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		const data = await res.json();
		if (!res.ok || !data.success)
			throw new Error(data.error || "Registration failed");
		localStorage.setItem("auth_token", data.token);
		setToken(data.token);
		setUser(data.user);
		return data;
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("auth_token");
		setToken(null);
		setUser(null);
	}, []);

	const updateAccount = useCallback(
		async (data) => {
			const res = await fetch(`${backendUrl}/auth/me`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			const result = await res.json();
			if (!res.ok || !result.success)
				throw new Error(result.error || "Update failed");
			setUser(result.user);
			return result;
		},
		[token],
	);

	const deleteAccount = useCallback(async () => {
		const res = await fetch(`${backendUrl}/auth/me`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
		const result = await res.json();
		if (!res.ok || !result.success)
			throw new Error(result.error || "Delete failed");
		logout();
	}, [token, logout]);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isLoading,
				isAuthenticated: !!token,
				login,
				register,
				logout,
				updateAccount,
				deleteAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
