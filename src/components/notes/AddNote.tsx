"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { noteSchema, noteSchemaType } from "@/src/interfaces/notes.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addNote } from "@/src/actions/addNote.action";
import { useState } from "react";
import { ClipboardPlus } from "lucide-react";

export function AddNote() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<noteSchemaType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: noteSchemaType) {
    try {
      const res = await addNote(values.title, values.content);
      if (res.msg === "done") {
        toast.success("Done!");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add note!");
      console.log(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            className="absolute end-3 bottom-3 z-50"
            variant="destructive"
          >
            <ClipboardPlus />
            Add Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New note</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">Add Note</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
