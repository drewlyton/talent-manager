import { useState, type FormEvent } from "react";

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
    <form onSubmit={submit}>
      <fieldset disabled={disabled}>
        <label aria-label="Your email">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="text-black"
            required
          />
        </label>
        <button>Submit</button>
        <Honeypot />
        {responseMessage && <p>{responseMessage}</p>}
      </fieldset>
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
