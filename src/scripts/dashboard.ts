import { SettingsModel } from "../models/settings.model.ts";

async function fetchSettings(): Promise<SettingsModel> {
  const response = await fetch("http://localhost:5001/dashboard/settings", {
    credentials: "include",
  });

  if (!response.ok) {
    window.location.replace("/auth/sign-in/");
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.settings;
}

function renderSettings(settings: SettingsModel): void {
  const settingsSection = document.querySelector("section#settings")!;

  const content = JSON.stringify(settings, null, 2);

  settingsSection.innerHTML = `<pre>${content}</pre>`;
}

async function signOut(): Promise<void> {
  const response = await fetch("http://localhost:5001/auth/sign-out", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  window.location.replace("/");
}

function addListeners(): void {
  const signOutButton = document.querySelector("#sign-out")!;
  const errorElement = document.querySelector("#error")!;

  signOutButton.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      await signOut();
      errorElement.innerHTML = "";
    } catch (err) {
      errorElement.innerHTML = (err as Error).message;
    }
  });
}

async function main(): Promise<void> {
  const settings = await fetchSettings();
  renderSettings(settings);

  addListeners();
}

await main();
