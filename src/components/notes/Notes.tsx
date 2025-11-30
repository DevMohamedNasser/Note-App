import { ScrollArea } from "@/components/ui/scroll-area";
import { getNotes } from "@/src/actions/getNotes.action";
import { Note } from "@/src/interfaces/notes.interface";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { UpdateNote } from "./UpdateNote";
import { DeleteNote } from "./DeleteNote";

export default async function Notes() {
  const { notes }: { notes: Note[] } = await getNotes();
  console.log(notes);

  return (
    <ScrollArea className="h-[80vh] w-full rounded  p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes?.length > 0 ? (
          notes.map((note) => (
            <Card key={note._id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                {/* <CardAction>
                    Card Action
                    </CardAction> */}
              </CardHeader>
              <CardContent>
                <p>{note.content}</p>
              </CardContent>
              <CardFooter>
                <p>
                  {new Date(note.createdAt).toLocaleDateString("en-us", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    hour12: true,
                    minute: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </CardFooter>
                <div className="ms-4 flex gap-3">
                  <UpdateNote id={note._id} defTitle={note.title} defContent={note.content} />
                  <DeleteNote id={note._id} />
                </div>
            </Card>
          ))
        ) : (
          <p>No notes added yet.</p>
        )}
      </div>
    </ScrollArea>
  );
}
