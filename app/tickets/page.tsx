import { CostumLink, StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import TicketToolbar from "./TicketToolbar";

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();
  return (
    <div>
      <TicketToolbar />
      <Table.Root variant="surface" className="mt-5" layout={"fixed"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Tickets</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tickets?.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell className="cursor-pointer hover:underline">
                <CostumLink href={`/tickets/${ticket.id}`}>
                  {ticket.title}
                </CostumLink>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={ticket.status} />
              </Table.Cell>
              <Table.Cell>{ticket.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TicketsPage;
