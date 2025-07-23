import { StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import ReactMarkdown from "react-markdown";

interface Props {
  params: {
    id: string;
  };
}

const TicketPageDetails = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params?.id),
    },
  });
  if (!ticket) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{ticket?.title}</Heading>
        <Flex gap="2" my="2">
          <StatusBadge status={ticket?.status} />
          <Text>{ticket.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{ticket?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button variant="soft" size="2">
          <CiEdit />
          <Link href={`/tickets/${ticket.id}/edit`}>Edit Ticket</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default TicketPageDetails;
