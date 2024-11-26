async function signIn(): Promise<void> {
  const form = document.querySelector("form")!;

  const formData = new FormData(form);

  const response = await fetch("http://localhost:5001/auth/sign-in", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  window.location.replace("/dashboard/");
}

function addListeners(): void {
  const form = document.querySelector("form")!;
  const errorElement = document.querySelector("#error")!;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await signIn();
      errorElement.innerHTML = "";
    } catch (err) {
      errorElement.innerHTML = (err as Error).message;
    }
  });
}

async function main(): Promise<void> {
  addListeners();
}

await main();
