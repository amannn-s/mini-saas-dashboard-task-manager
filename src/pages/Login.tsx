import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../lib/authService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast("Logged In Successfully!");
      navigate("/", { replace: true });
    } catch {
      setError("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-6 rounded shadow space-y-4 w-80">
        <h2 className="text-xl font-bold">Login</h2>
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={submitting}
        >
          Login
        </Button>
        <Button asChild variant={"secondary"} className="w-full">
          <a href="/dashboard">Go to dashboard</a>
        </Button>
      </div>
    </form>
  );
}
