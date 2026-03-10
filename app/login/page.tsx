"use client"

import React, { useEffect } from "react"
import {useAuth} from "@/features/auth/application/hooks/useAuth";
import {LoginButton} from "@/features/auth/ui/components/LoginButton";

export default function LoginPage() {
    const { loadUser } = useAuth()

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <LoginButton />
        </div>
    )
}