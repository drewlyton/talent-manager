import type { APIRoute } from "astro";
import { updateCSV } from "../updateCSV";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  // Validate the data - you'll probably want to do more than this
  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Whoops! Please provide a valid email.",
      }),
      { status: 400 },
    );
  }
  // If honeypot field is filled out, return early
  const honeypot = data.get("last_name");
  if (honeypot)
    return new Response(
      JSON.stringify({
        message:
          "🤔 Hmmm...seems like you might be a robot. If you're not, please refresh the page and try again.",
      }),
      { status: 200 },
    );

  updateCSV(email.toString());
  return new Response(
    JSON.stringify({
      message:
        "🎉 Welcome to the waitlist! Please check your email for more information about getting started with Repbot.",
    }),
    { status: 200 },
  );
};
