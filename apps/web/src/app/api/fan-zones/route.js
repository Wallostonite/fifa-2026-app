import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    let fanZones;

    if (country) {
      fanZones = await sql`
        SELECT * FROM fan_zones 
        WHERE country = ${country}
        ORDER BY attendee_count DESC
      `;
    } else {
      fanZones = await sql`
        SELECT * FROM fan_zones 
        ORDER BY attendee_count DESC
      `;
    }

    return Response.json(fanZones);
  } catch (error) {
    console.error("Error fetching fan zones:", error);
    return Response.json(
      { error: "Failed to fetch fan zones" },
      { status: 500 },
    );
  }
}
