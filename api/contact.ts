// Vercel Serverless Function — runs on the server, never in the browser.
// The bot token and chat ID are read from Environment Variables that
// you set in the Vercel dashboard, not from this file. This is what
// keeps them hidden from anyone viewing the website's source code.

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return new Response(
      JSON.stringify({ error: "Telegram is not configured on the server" }),
      { status: 500 }
    );
  }

  try {
    const { name, email, business, message } = await req.json();

    const text =
      `New website inquiry\n\n` +
      `Name: ${name || "-"}\n` +
      `Email: ${email || "-"}\n` +
      `Business: ${business || "-"}\n` +
      `Message: ${message || "-"}`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!telegramRes.ok) {
      return new Response(JSON.stringify({ error: "Telegram send failed" }), {
        status: 502,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}
