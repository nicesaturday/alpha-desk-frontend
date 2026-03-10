import { env } from "../config/env"

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {

    const res = await fetch(`${env.apiBaseUrl}${path}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    })

    if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`)
    }

    return res.json()
}

export const http = {
    get: <T>(path: string) =>
        request<T>(path, { method: "GET" }),

    post: <T>(path: string, body?: unknown) =>
        request<T>(path, {
            method: "POST",
            body: JSON.stringify(body),
        }),

    put: <T>(path: string, body?: unknown) =>
        request<T>(path, {
            method: "PUT",
            body: JSON.stringify(body),
        }),

    delete: <T>(path: string) =>
        request<T>(path, { method: "DELETE" }),
}