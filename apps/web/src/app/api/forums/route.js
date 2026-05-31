import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const team = searchParams.get("team");
    const search = searchParams.get("search");

    let posts;

    if (team && search) {
      posts = await sql`
        SELECT * FROM forum_posts
        WHERE team = ${team}
          AND (title ILIKE ${"%" + search + "%"} OR content ILIKE ${"%" + search + "%"})
        ORDER BY created_date DESC
      `;
    } else if (team) {
      posts = await sql`
        SELECT * FROM forum_posts WHERE team = ${team} ORDER BY created_date DESC
      `;
    } else if (search) {
      posts = await sql`
        SELECT * FROM forum_posts
        WHERE title ILIKE ${"%" + search + "%"} OR content ILIKE ${"%" + search + "%"}
        ORDER BY created_date DESC
      `;
    } else {
      posts = await sql`SELECT * FROM forum_posts ORDER BY created_date DESC`;
    }

    return Response.json(posts);
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    return Response.json({ error: "Failed to fetch forum posts" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { team, title, content, author_name } = body;

    if (!team || !title || !content) {
      return Response.json({ error: "Missing required fields: team, title, content" }, { status: 400 });
    }

    const post = await sql`
      INSERT INTO forum_posts (team, title, content, author_name, replies_count, likes, created_date)
      VALUES (${team}, ${title}, ${content}, ${author_name || "Anonymous"}, 0, 0, NOW())
      RETURNING *
    `;

    return Response.json(post[0], { status: 201 });
  } catch (error) {
    console.error("Error creating forum post:", error);
    return Response.json({ error: "Failed to create forum post" }, { status: 500 });
  }
}
