import prisma from "@/prisma/client";
import { Status, Ticket } from "@prisma/client";
import TicketTable from "./TicketTable";
import TicketToolbar from "./TicketToolbar";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy?: keyof Ticket;
    orderDirection?: "asc" | "desc";
    page: string;
  };
}

const TicketsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const allowedStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const allowedOrders = ["asc", "desc"];
  const allowedOrderKeys: (keyof Ticket)[] = ["title", "status", "createdAt"];

  const page = parseInt(resolvedSearchParams.page) || 1;
  const pageSize = 10;

  const status = allowedStatuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const orderBy =
    allowedOrderKeys.includes(resolvedSearchParams.orderBy!) &&
    allowedOrders?.includes(resolvedSearchParams.orderDirection!)
      ? { [resolvedSearchParams.orderBy!]: resolvedSearchParams.orderDirection }
      : undefined;

  const tickets = await prisma.ticket.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const totalItems = await prisma.ticket.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <TicketToolbar />
      <TicketTable tickets={tickets} />
      <Pagination
        itemCount={totalItems.length}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default TicketsPage;
