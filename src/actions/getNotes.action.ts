"use server";

import { getAuthToken } from "@/lib/getAuthToken";

export async function getNotes({ tags }: { tags?: string[] } = {}) {
  const token = await getAuthToken();

  if (!token) throw new Error("Unauthenticated");

  try {
    const res = await fetch(`${process.env.API_BASE_URL}notes`, {
      headers: {
        token: "3b8ny__" + token,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error Fetching Data!");

    const data = await res.json();
    return data;
  } catch (error) {
  console.error("getNotes error:", error);
  return { notes: [], error: (error as Error).message };
}

}
