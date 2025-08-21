import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TicketStatusFilter from "./TicketStatusFilter";

const TicketToolbar = () => {
  return (
    <Flex justify="between" align="center" mb="5">
      <TicketStatusFilter />
      <Button>
        <Link href="/tickets/new"> Create ticket</Link>
      </Button>
    </Flex>
  );
};

export default TicketToolbar;
