import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function WaitlistForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);
    const target = e.target as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/waitlist", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      target.reset();
      setResponseMessage(data.message);
    }
    setDisabled(false);
  }

  return (
    <form onSubmit={submit} className="max-w-lg w-full">
      <fieldset disabled={disabled} className="flex flex-col md:flex-row gap-3">
        <label aria-label="Your email" className="w-full">
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            className="text-lg h-full"
            required
          />
        </label>
        <Button size={"lg"} className="whitespace-nowrap">
          Sign Up
        </Button>
        <Honeypot />
      </fieldset>
      {responseMessage && <p className="mb-3 text-sm">{responseMessage}</p>}
    </form>
  );
}

// Form field used to catch spammers
export const Honeypot = () => (
  <label
    htmlFor="last_name"
    aria-hidden="true"
    className="hidden"
    aria-label="Hey friend, if you're human, don't fill this out. It's only to catch spammers."
  >
    Last Name
    <input
      type="text"
      name="last_name"
      id="last_name"
      className="hidden"
      autoComplete="off"
    />
  </label>
);
