import { StatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";
interface Props {
  params: Promise<{ id: string }>;
}

const TicketPageDetails = async ({ params }: Props) => {
  // const router = useRouter();
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(id),
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
      {session && (
        <Box>
          <Flex align="center" mb="4" gap={"2"}>
            <AssigneeSelect ticket={ticket} />
            <EditButton ticketId={ticket.id} />
            <DeleteButton ticketId={ticket.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
export const metadata: Metadata = {
  title: "Ticket Details",
  description: "View the details of your tickets",
};

export default TicketPageDetails;
