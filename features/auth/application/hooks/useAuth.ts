import { useAtom } from "jotai"
import { authStateAtom } from "../atoms/authAtom"
import { fetchCurrentUser, logoutUser } from "../../infrastructure/api/authApi"

export const useAuth = () => {
    const [state, setState] = useAtom(authStateAtom)

    const loadUser = async () => {
        try {
            const user = await fetchCurrentUser()
            setState({ status: "AUTHENTICATED", user })
        } catch {
            setState({ status: "UNAUTHENTICATED" })
        }
    }

    const logout = async () => {
        await logoutUser()
        setState({ status: "UNAUTHENTICATED" })
    }

    return { state, loadUser, logout }
}
