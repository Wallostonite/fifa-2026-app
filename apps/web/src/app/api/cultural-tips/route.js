import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    if (!country) {
      return Response.json({ error: "Country is required" }, { status: 400 });
    }

    const tips = await sql`
      SELECT * FROM cultural_tips 
      WHERE country = ${country}
      ORDER BY category, id
    `;

    return Response.json(tips);
  } catch (error) {
    console.error("Error fetching cultural tips:", error);
    return Response.json(
      { error: "Failed to fetch cultural tips" },
      { status: 500 },
    );
  }
}
