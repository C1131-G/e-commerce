import { NextResponse } from "next/server";
import { db } from "@workspace/db";
import { assignments, farmers } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select({
        id: farmers.id,
        name: farmers.name,
        location: farmers.location,
        assignedDate: assignments.assignedDate,
        status: assignments.status,
      })
      .from(assignments)
      .innerJoin(farmers, eq(assignments.farmerId, farmers.id));

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch assigned farmers",
      },
      {
        status: 500,
      }
    );
  }
}