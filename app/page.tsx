// import { getAuthToken } from "@/lib/getAuthToken";
import { AddNote } from "@/src/components/notes/AddNote";
import Notes from "@/src/components/notes/Notes";

export default async function Home() {
  // const token = await getAuthToken();
  // console.log(token);

  return (
    <>
      <AddNote />
      <Notes />
    </>
  );
}
