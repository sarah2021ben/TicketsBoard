import { ticketSchema } from "@/app/validationsSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
 
export async function PATCH(request: NextRequest, { params } :{ params:{id:string} }){
 const body = await request.json();
 const validation = ticketSchema.safeParse(body);
 if(!validation.success)
  return NextResponse.json(validation.error.format(), {status : 400})
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
   })
   if(!ticket)
    return NextResponse.json({message: "Ticket not found"}, {status: 404})
   const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      title: body.title,
      description: body.description,
    },
   });
 return NextResponse.json(updatedTicket)}