export type AuthIntent =
    | { type: "LOGIN_GOOGLE" }
    | { type: "LOGIN_KAKAO" }
    | { type: "LOGOUT" }