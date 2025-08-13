export const metadata = { title: "User" };

export default function UserPage() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">User Dashboard</h1>
      <p className="text-gray-500 mt-2">This is a protected page. Add auth guard later.</p>
    </main>
  );
}
