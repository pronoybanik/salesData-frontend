"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const result = await res.json();
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
};


export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/getAuthorize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json();

        if (result.token) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
        }

        return result;
    } catch (error: any) {
        return Error(error);
    }
};