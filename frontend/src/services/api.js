export const loginUser = async (email, password) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ email, password })
    });
  
    return res.text();
  };