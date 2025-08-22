import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TicketStatusFilter from "./TicketStatusFilter";
import { Suspense } from "react";

const TicketToolbar = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Flex justify="between" align="center" mb="5">
        <TicketStatusFilter />
        <Button>
          <Link href="/tickets/new"> Create ticket</Link>
        </Button>
      </Flex>
    </Suspense>
  );
};

export default TicketToolbar;
