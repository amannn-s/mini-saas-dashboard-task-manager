export const login = async (email: string, password: string) => {
  const res = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1 ",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();

  localStorage.setItem("token", data.token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};
