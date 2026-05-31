import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const search = searchParams.get("search");

    let events;

    if (city && search) {
      events = await sql`
        SELECT * FROM fan_events
        WHERE city = ${city}
          AND (title ILIKE ${"%" + search + "%"} OR description ILIKE ${"%" + search + "%"})
        ORDER BY date_time ASC
      `;
    } else if (city) {
      events = await sql`
        SELECT * FROM fan_events WHERE city = ${city} ORDER BY date_time ASC
      `;
    } else if (search) {
      events = await sql`
        SELECT * FROM fan_events
        WHERE title ILIKE ${"%" + search + "%"} OR description ILIKE ${"%" + search + "%"}
        ORDER BY date_time ASC
      `;
    } else {
      events = await sql`SELECT * FROM fan_events ORDER BY date_time ASC`;
    }

    return Response.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, team, city, venue_name, address, date_time, organizer_name, type } = body;

    if (!title || !city || !venue_name || !date_time) {
      return Response.json({ error: "Missing required fields: title, city, venue_name, date_time" }, { status: 400 });
    }

    const event = await sql`
      INSERT INTO fan_events (title, description, team, city, venue_name, address, date_time, organizer_name, type, attendees_count)
      VALUES (${title}, ${description || null}, ${team || null}, ${city}, ${venue_name}, ${address || null}, ${date_time}, ${organizer_name || null}, ${type || "Other"}, 0)
      RETURNING *
    `;

    return Response.json(event[0], { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return Response.json({ error: "Failed to create event" }, { status: 500 });
  }
}
