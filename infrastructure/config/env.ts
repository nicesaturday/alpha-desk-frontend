function requireEnv(name: string) {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing env: ${name}`)
    }
    return value
}

export const env = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
    googleLoginPath: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_PATH!,
    kakaoLoginPath: process.env.NEXT_PUBLIC_KAKAO_LOGIN_PATH!,
}