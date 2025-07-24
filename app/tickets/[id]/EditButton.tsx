import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";

const EditButton = ({ ticketId }: { ticketId: number }) => {
  return (
    <Button variant="soft" size="2">
      <CiEdit />
      <Link href={`/tickets/${ticketId}/edit`}>Edit Ticket</Link>
    </Button>
  );
};

export default EditButton;
