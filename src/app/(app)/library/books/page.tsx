import { getBooks } from "@/lib/actions"
import { getStudents } from "@/app/lib/data"
import { BooksClient } from "./books-client"

export default async function BooksPage() {
  const books = await getBooks();
  const students = getStudents();

  return (
    <BooksClient initialBooks={books} students={students} />
  )
}
