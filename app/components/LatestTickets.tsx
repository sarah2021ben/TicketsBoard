import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import CostumLink from "./CostumLink";
import StatusBadge from "./StatusBadge";

const LatestTickets = async () => {
  const latestTickets = await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return (
    <Card>
      <Heading size="3" mb="4" ml="3">
        Latest Tickets
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestTickets?.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell className="cursor-pointer hover:underline">
                <Flex direction="column" gap="2" align="start">
                  <CostumLink href={`/tickets/${ticket.id}`}>
                    {ticket.title}
                  </CostumLink>
                  <StatusBadge status={ticket.status} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTickets;
