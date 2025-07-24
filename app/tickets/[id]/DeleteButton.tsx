"use client";
import React, { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { Spinner } from "@/app/components";

const DeleteButton = ({ ticketId }: { ticketId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/tickets/${ticketId}`);
      router.push("/tickets"); // Redirect to tickets list after deletion
      // Optionally, you can refresh the current page to reflect changes
      router.refresh();
    } catch {
      setIsDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="solid" color="red" size="2" disabled={isDeleting}>
            <MdDeleteOutline />
            Delete Ticket
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Ticket</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this ticket? This ticket will no
            longer be accessible.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleDeleteTicket}>
                Delete{" "}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {error && (
        <AlertDialog.Root open={error} onOpenChange={setError}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>
              There was an error deleting the ticket. Please try again later.
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Close
                </Button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteButton;
