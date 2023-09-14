import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  // Validate the data - you'll probably want to do more than this
  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
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

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
