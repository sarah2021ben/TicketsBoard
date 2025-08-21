import React from "react";
import { LatestTickets, TicketSummary, TicketsChart } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

const Home = async () => {
  const open = await prisma.ticket.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.ticket.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.ticket.count({ where: { status: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <TicketSummary open={open} inProgress={inProgress} closed={closed} />
        <TicketsChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestTickets />
    </Grid>
  );
};
export const metadata: Metadata = {
  title: "TicketBoard - Home",
  description: "View a summary of your tickets",
};

export default Home;
