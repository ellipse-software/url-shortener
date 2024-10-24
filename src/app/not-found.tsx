import { redirect } from "next/navigation";

export default function notFound() {
  redirect("https://ellipse.software");
}
