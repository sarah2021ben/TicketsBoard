import TicketForm from "@/app/components/TicketForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ id: string }>;
}

const EditTicketPage = async ({ params }: Props) => {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(id) },
  });
  if (!ticket) notFound();
  return <TicketForm ticket={ticket} />;
};

export default EditTicketPage;
