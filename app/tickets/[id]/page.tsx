import { StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
interface Props {
  params: {
    id: string;
  };
}

const TicketPageDetails = async ({ params }: Props) => {
  // const router = useRouter();
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
        <Flex align="center" mb="4" gap={"2"}>
          <EditButton ticketId={ticket.id} />
          <DeleteButton ticketId={ticket.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default TicketPageDetails;
