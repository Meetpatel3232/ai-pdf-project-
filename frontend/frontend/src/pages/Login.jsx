
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (!data.success) {
        setIsError(true);
        setMessage(data.message || "Login failed.");
        return;
      }

      setMessage(data.message || "Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl md:grid-cols-2">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-950 p-10 md:flex">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
                ✦
              </div>
              <span className="text-xl font-bold">PDF AI Assistant</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Your documents.
              <br />
              Your AI assistant.
            </h1>

            <p className="mt-5 leading-7 text-indigo-100">
              Ask questions, understand complex documents, and get useful
              insights from your PDFs.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <p className="text-lg font-semibold">Turn documents into insights.</p>
            <p className="mt-2 text-sm text-indigo-100">
              A smarter way to work with your PDFs.
            </p>
          </div>
        </section>

        <section className="p-6 sm:p-10 md:p-12">
          <div className="mb-8 md:hidden">
            <div className="mb-3 text-3xl text-indigo-400">✦</div>
            <h1 className="text-2xl font-bold">PDF AI Assistant</h1>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold tracking-widest text-indigo-400">
              WELCOME BACK
            </p>
            <h2 className="text-3xl font-bold">Sign in to your account</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

               <div>
  <label
    htmlFor="username"
    className="mb-2 block text-sm font-medium"
  >
    Username
  </label>

  <input
    id="username"
    name="username"
    type="text"
    autoComplete="username"
    placeholder="Enter your username"
    value={formData.username}
    onChange={handleChange}
    required
    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
  />
</div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {message && (
              <div
                role="alert"
                className={`rounded-xl border p-3 text-sm ${
                  isError
                    ? "border-red-500/30 bg-red-500/10 text-red-300"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                }`}
              >
                {message}
                {isError && /register first|need to register/i.test(message) && (
                  <div className="mt-2">
                    <Link
                      to="/register"
                      className="font-semibold underline underline-offset-4"
                    >
                      Create an account →
                    </Link>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3.5 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

