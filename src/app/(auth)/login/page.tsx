export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        {/* form placeholder */}
        <form className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="Email" />
          <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" />
          <button className="w-full bg-black text-white rounded px-3 py-2">Sign in</button>
        </form>
      </div>
    </main>
  );
}
