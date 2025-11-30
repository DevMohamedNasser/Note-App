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
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { updateNote } from "@/src/actions/updateNote.action";

export function UpdateNote({id, defTitle, defContent} : {id : string, defTitle: string, defContent: string}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<noteSchemaType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: defTitle,
      content: defContent,
    },
  });

  async function onSubmit(values: noteSchemaType) {
    try {
      const res = await updateNote(values.title, values.content, id);
      if (res.msg === "done") {
        toast.success("Done!");
        setIsOpen(false);
    }
    } catch (error) {
      toast.error("Failed to update note!");
      console.log(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="" variant="outline">
            <SquarePen />
            Update Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update note</DialogTitle>
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
                      <Input placeholder="" {...field} defaultValue={defTitle} />
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
                      <Input placeholder="" defaultValue={defContent} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
