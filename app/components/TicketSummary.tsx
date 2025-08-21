import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const TicketSummary = ({ open, inProgress, closed }: Props) => {
  const statistics: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {statistics.map((stat) => (
        <Card key={stat.status}>
          <Flex direction="column" gap="2">
            <Link
              href={`/tickets?status=${stat.status}`}
              className="hover:text-amber-400 transition-colors font-medium text-sm"
            >
              {stat.label} Tickets
            </Link>
            <Text size="5" className="font-bold text-amber-500">
              {stat.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default TicketSummary;
