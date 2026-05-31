import { GET as getCities } from "../route.js";

export async function GET(request, { params }) {
  const { id } = params;

  const allRes = await getCities(new Request("http://localhost/api/cities"));
  const cities = await allRes.json();

  const city = cities.find((c) => c.id === id);
  if (!city) {
    return Response.json({ error: "City not found" }, { status: 404 });
  }

  return Response.json(city);
}
