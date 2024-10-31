import { CreateForm } from "@/components/createForm";
import Link from "next/link";

export default async function Create() {
  return (
    <div className="max-w-2xl p-4 w-full flex flex-col space-y-4">
      <CreateForm />
    </div>
  );
}
