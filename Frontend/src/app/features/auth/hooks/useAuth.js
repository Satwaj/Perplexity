import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../services/api.auth";
import { setUser, setLoading, setError } from "../auth.slice";


export function useAuth() {


    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            const data = await register(email, username, password)
            // Save token to localStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token)
            }
            dispatch(setUser(data.user))
            return data.user
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const data = await login(email, password)
            // Save token to localStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token)
            }
            dispatch(setUser(data.user))
            return data.user
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.err || "Login failed";
            dispatch(setError(errorMessage))
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to fetch user data"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    function handleLogout() {
        try {
            // Call logout endpoint
            logout().catch(err => console.log("Logout API error:", err.message))
        } finally {
            // Clear local storage and Redux state regardless of API response
            localStorage.removeItem('authToken')
            dispatch(setUser(null))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    }

}