import React from "react"
import { authCommand } from "@/features/auth/application/commands/authCommand"
import Button from "@/ui/components/button/button"

export const LoginButton = () => (
    <div className="flex flex-col justify-center items-center gap-4">
        <Button
            label="Google Login"
            onClick={authCommand.LOGIN_GOOGLE}
            variant="primary"
        />
        <Button
            label="Kakao Login"
            onClick={authCommand.LOGIN_KAKAO}
            className="bg-yellow-300 text-black"
        />
    </div>
)