
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  author: z.string().min(2, "Author must be at least 2 characters."),
  isbn: z.string().min(10, "ISBN must be at least 10 characters.").max(13, "ISBN can be at most 13 characters."),
  genre: z.string().min(1, "Genre is required."),
  totalCopies: z.coerce.number().int().min(1, "There must be at least one copy."),
});

type AddBookFormValues = z.infer<typeof formSchema>;

interface AddBookFormProps {
  onFormSubmit: (data: AddBookFormValues) => void;
}

export function AddBookForm({ onFormSubmit }: AddBookFormProps) {
  const form = useForm<AddBookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      genre: "",
      totalCopies: 1,
    },
  });

  function onSubmit(data: AddBookFormValues) {
    onFormSubmit(data);
    toast({
      title: "Book Added",
      description: `"${data.title}" has been successfully added to the library.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. The Great Gatsby" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="e.g. F. Scott Fitzgerald" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 9780743273565" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Classic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Copies</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Book
        </Button>
      </form>
    </Form>
  );
}
