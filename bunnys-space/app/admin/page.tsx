import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminHome() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>You’re logged in.</p>
    </main>
  );
}
