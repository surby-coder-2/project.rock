import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
      <h1 className="text-3xl font-bold text-teal-700">project.rock</h1>
      <p className="text-gray-500">Signed in as {user.email}</p>
      <form action={signOut}>
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-gray-100 rounded-xl text-gray-700 font-medium min-h-[56px]"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
