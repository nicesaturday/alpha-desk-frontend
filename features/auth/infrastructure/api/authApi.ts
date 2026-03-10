import { env } from "@/infrastructure/config/env"
import { AuthUser } from "../../domain/model/authUser"
import { http } from "@/infrastructure/http/httpClient"

type OAuthProvider = "google" | "kakao"
const oauthPaths: Record<OAuthProvider, string> = {
    google: env.googleLoginPath,
    kakao: env.kakaoLoginPath,
}

export function redirectOAuthLogin(provider: OAuthProvider) {
    const path = oauthPaths[provider]
    window.location.href = `${env.apiBaseUrl}${path}`
}

export async function fetchCurrentUser(): Promise<AuthUser> {
    return http.get<AuthUser>("/auth/me")
}

export async function logoutUser() {
    return http.post("/auth/logout")
}