"use server"

import { jwtDecode } from "jwt-decode";
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
        
    } catch (error: unknown) {
        return error instanceof Error ? error : new Error(String(error));
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
            (await cookies()).set("accessToken", result.token);
        }

        return result;
    } catch (error: unknown) {
        return error instanceof Error ? error : new Error(String(error));
    }
};


export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value
  let decodeData = null;

  if (accessToken) {
    decodeData = await jwtDecode(accessToken);
    return decodeData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
}