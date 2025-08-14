"use client";
import { Ticket, User } from "@prisma/client";
import { Select, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const AssigneeSelect = ({ ticket }: { ticket: Ticket }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minutes
    retry: 3, // Retry 3 times on failure
  });
  if (isLoading) return <Spinner />;
  if (error) return null;
  const handleChangeUser = (value: string) => {
    axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedUserId: value === "unssigned" ? null : value, // If value is empty, set to null
      })
      .then(() => {
        toast.success("User assigned successfully");
      })
      .catch(() => {
        toast.error("Failed to assign user");
      });
  };
  return (
    <>
      <Select.Root
        onValueChange={handleChangeUser}
        value={ticket.assignedUserId || "unssigned"}
      >
        <Select.Trigger placeholder="Assign..." style={{ minWidth: 140 }} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unssigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster position="top-center" />
    </>
  );
};

export default AssigneeSelect;
