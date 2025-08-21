"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const TicketStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusOptions: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value);
    router.push(`/tickets?${params.toString()}`);
  };
  return (
    <Select.Root
      onValueChange={handleStatusChange}
      defaultValue={searchParams.get("status") || ""}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Item value="ALL">All</Select.Item>
        {statusOptions.map((option) => (
          <Select.Item key={option.label} value={option?.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default TicketStatusFilter;
