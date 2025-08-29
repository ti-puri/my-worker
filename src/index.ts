export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    const clientIP = request.headers.get("cf-connecting-ip") || "unknown";
    const country = request.headers.get("cf-ipcountry") || "unknown";
    const ua = request.headers.get("user-agent") || "unknown";

    const url = new URL(request.url);
    const method = request.method;
    const now = new Date().toISOString();

    // ✅ log ใน Cloudflare Workers > Logs
    console.log(
      `[${now}] ${method} ${url.pathname} | IP: ${clientIP} | Country: ${country} | UA: ${ua}`
    );

    // ✅ ส่ง response กลับเป็น JSON
    const body = {
      timestamp: now,
      ip: clientIP,
      country,
      userAgent: ua,
      method,
      path: url.pathname,
    };

    return new Response(JSON.stringify(body, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
