export async function GET() {
  const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
