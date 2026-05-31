import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const profile = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    if (profile.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json(profile[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return Response.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId,
      country,
      countryFlag,
      team,
      language,
      notificationsEnabled,
    } = body;

    if (!userId || !country || !countryFlag || !team || !language) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingProfile = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `;

    if (existingProfile.length > 0) {
      const updated = await sql`
        UPDATE user_profiles
        SET country = ${country},
            country_flag = ${countryFlag},
            team = ${team},
            language = ${language},
            notifications_enabled = ${notificationsEnabled ?? true}
        WHERE user_id = ${userId}
        RETURNING *
      `;
      return Response.json(updated[0]);
    }

    const newProfile = await sql`
      INSERT INTO user_profiles (user_id, country, country_flag, team, language, notifications_enabled)
      VALUES (${userId}, ${country}, ${countryFlag}, ${team}, ${language}, ${notificationsEnabled ?? true})
      RETURNING *
    `;

    return Response.json(newProfile[0]);
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    return Response.json(
      { error: "Failed to save user profile" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      userId,
      country,
      countryFlag,
      team,
      language,
      notificationsEnabled,
    } = body;

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const updates = [];
    const values = [];
    let paramCount = 0;

    if (country !== undefined) {
      paramCount++;
      updates.push(`country = $${paramCount}`);
      values.push(country);
    }
    if (countryFlag !== undefined) {
      paramCount++;
      updates.push(`country_flag = $${paramCount}`);
      values.push(countryFlag);
    }
    if (team !== undefined) {
      paramCount++;
      updates.push(`team = $${paramCount}`);
      values.push(team);
    }
    if (language !== undefined) {
      paramCount++;
      updates.push(`language = $${paramCount}`);
      values.push(language);
    }
    if (notificationsEnabled !== undefined) {
      paramCount++;
      updates.push(`notifications_enabled = $${paramCount}`);
      values.push(notificationsEnabled);
    }

    if (updates.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    paramCount++;
    values.push(userId);

    const query = `UPDATE user_profiles SET ${updates.join(", ")} WHERE user_id = $${paramCount} RETURNING *`;
    const updated = await sql(query, values);

    if (updated.length === 0) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json(updated[0]);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return Response.json(
      { error: "Failed to update user profile" },
      { status: 500 },
    );
  }
}
