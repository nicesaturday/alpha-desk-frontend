import { redirectOAuthLogin } from "../../infrastructure/api/authApi"

export type AuthCommand = () => void

export const authCommand: Record<string, AuthCommand> = {
    LOGIN_GOOGLE: () => redirectOAuthLogin("google"),
    LOGIN_KAKAO: () => redirectOAuthLogin("kakao"),
    LOGOUT: () => console.warn("Use logout from useAuth hook"),
}
