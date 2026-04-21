import { NextRequest, NextResponse } from "next/server"

const PROTECTED_ROUTES = [
    "/my",
    "/dashboard",
    "/watchlist",
    "/ai-insight",
    "/invest",
    "/investment",
    "/profile",
    "/board/create",
    "/board/edit",
    "/stock-recommendation",
]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isProtected = PROTECTED_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    )

    if (!isProtected) return NextResponse.next()

    const accountId = request.cookies.get("account_id")
    const tempToken = request.cookies.get("temp_token")

    if (!accountId && tempToken) {
        return NextResponse.redirect(new URL("/terms", request.url))
    }

    if (!accountId) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/my",
        "/my/:path*",
        "/dashboard",
        "/dashboard/:path*",
        "/watchlist",
        "/watchlist/:path*",
        "/ai-insight",
        "/ai-insight/:path*",
        "/invest",
        "/invest/:path*",
        "/investment",
        "/investment/:path*",
        "/profile",
        "/profile/:path*",
        "/board/create",
        "/board/create/:path*",
        "/board/edit/:path*",
        "/stock-recommendation",
        "/stock-recommendation/:path*",
    ],
}
