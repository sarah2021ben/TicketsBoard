import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TicketToolbar = () => {
  return (
    <div>
      <Button>
        <Link href="/tickets/new"> Create ticket</Link>
      </Button>
    </div>
  );
};

export default TicketToolbar;
