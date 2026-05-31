import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ error: "userId is required" }, { status: 400 });
    }

    const matches = await sql`
      SELECT * FROM my_matches WHERE user_id = ${userId} ORDER BY date ASC
    `;

    return Response.json(matches);
  } catch (error) {
    console.error("Error fetching my matches:", error);
    return Response.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, team1, team2, date, venue, city, country, stage, notes } = body;

    if (!userId || !team1 || !team2 || !date || !venue || !city || !country) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const match = await sql`
      INSERT INTO my_matches (user_id, team1, team2, date, venue, city, country, stage, notes)
      VALUES (${userId}, ${team1}, ${team2}, ${date}, ${venue}, ${city}, ${country}, ${stage || "Group Stage"}, ${notes || null})
      RETURNING *
    `;

    return Response.json(match[0], { status: 201 });
  } catch (error) {
    console.error("Error creating match:", error);
    return Response.json({ error: "Failed to create match" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, userId, team1, team2, date, venue, city, country, stage, notes } = body;

    if (!id || !userId) {
      return Response.json({ error: "id and userId are required" }, { status: 400 });
    }

    const match = await sql`
      UPDATE my_matches
      SET team1 = ${team1}, team2 = ${team2}, date = ${date}, venue = ${venue},
          city = ${city}, country = ${country}, stage = ${stage}, notes = ${notes || null}
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;

    if (!match.length) {
      return Response.json({ error: "Match not found" }, { status: 404 });
    }

    return Response.json(match[0]);
  } catch (error) {
    console.error("Error updating match:", error);
    return Response.json({ error: "Failed to update match" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return Response.json({ error: "id and userId are required" }, { status: 400 });
    }

    await sql`DELETE FROM my_matches WHERE id = ${id} AND user_id = ${userId}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting match:", error);
    return Response.json({ error: "Failed to delete match" }, { status: 500 });
  }
}
