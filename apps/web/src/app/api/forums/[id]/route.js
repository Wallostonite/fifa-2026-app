import sql from "../../utils/sql.js";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action } = body;

    if (action === "like") {
      const post = await sql`
        UPDATE forum_posts SET likes = likes + 1 WHERE id = ${id} RETURNING *
      `;
      if (!post.length) return Response.json({ error: "Post not found" }, { status: 404 });
      return Response.json(post[0]);
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating forum post:", error);
    return Response.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await sql`DELETE FROM forum_posts WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting forum post:", error);
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
