export const metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <p className="text-gray-500 mt-2">This is a protected page. Add auth guard later.</p>
    </main>
  );
}
