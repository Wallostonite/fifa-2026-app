import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    if (!country) {
      return Response.json({ error: "Country is required" }, { status: 400 });
    }

    const safetyInfo = await sql`
      SELECT * FROM safety_info 
      WHERE country = ${country}
    `;

    if (safetyInfo.length === 0) {
      return Response.json(
        { error: "Safety info not found for this country" },
        { status: 404 },
      );
    }

    return Response.json(safetyInfo[0]);
  } catch (error) {
    console.error("Error fetching safety info:", error);
    return Response.json(
      { error: "Failed to fetch safety info" },
      { status: 500 },
    );
  }
}
