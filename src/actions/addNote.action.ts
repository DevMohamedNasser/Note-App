'use server';

import { getAuthToken } from "@/lib/getAuthToken";
import { revalidateTag } from "next/cache";

export async function addNote(title: string, content: string) {
    const token = await getAuthToken();
    
        if (!token) 
            throw new Error('Unauthenticated');
        
        try {
            const res = await fetch(`${process.env.API_BASE_URL}notes`, {
                method: 'POST',
                headers: {
                    token: '3b8ny__' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, content}),
                cache: 'no-store',
            });
            if (!res.ok) 
                throw new Error('Error Fetching Data!');
            
            const data = await res.json();
            if (data?.msg)
                revalidateTag('notes');

            return data;
    
        } catch (error) {
            console.log(error);
        }
}