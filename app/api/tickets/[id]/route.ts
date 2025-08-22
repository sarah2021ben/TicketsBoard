import authOptions from "@/app/auth/authOptions";
import {  patchTicketSchema } from "@/app/validationsSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
 
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
  /* const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } */
 const id = (await params).id
 const body = await request.json();
 const validation =  patchTicketSchema.safeParse(body);

 if(!validation.success)
  return NextResponse.json(validation.error.format(), {status : 400})
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(id),
    },
   })
   const { title, description, assignedUserId } = body;
 if(assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user) {
      return NextResponse.json({ message: "Assigned user not found" }, { status: 404 });
 }
  }
   if(!ticket)
    return NextResponse.json({message: "Ticket not found"}, {status: 404})
   const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      title,
      description, 
      assignedUserId,
    },
   });
 return NextResponse.json(updatedTicket)}

 export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }){
  const id = (await params).id
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(id),
    },
   })
   if(!ticket)
    return NextResponse.json({message: "Ticket not found"}, {status: 404})
    await prisma.ticket.delete({
      where: { id: ticket.id },
    });
 return NextResponse.json({message: "Ticket deleted successfully"}, {status: 200})}