"use server";

import { getAuthToken } from "@/lib/getAuthToken";
import { updateTag } from "next/cache";

export async function updateNote(title: string, content: string, id: string) {
  const token = await getAuthToken();

  if (!token) throw new Error("Unauthenticated");

  try {
    const res = await fetch(`${process.env.API_BASE_URL}notes/${id}`, {
      method: "PUT",
      headers: {
        token: "3b8ny__" + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error Fetching Data!");

    const data = await res.json();
    if (data?.msg === "done") {
      updateTag('notes');
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
