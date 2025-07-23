import TicketForm from "@/app/components/TicketForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}

const EditTicketPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket) notFound();
  return <TicketForm ticket={ticket} />;
};

export default EditTicketPage;
