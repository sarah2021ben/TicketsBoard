import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { ticketSchema } from "@/app/validationsSchema";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);
  if(!validation.success){
   return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newTicket = await prisma.ticket.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })
  return NextResponse.json(newTicket, { status: 201 });
}