"use client";
import { Table } from "@radix-ui/themes";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { CostumLink, StatusBadge } from "../components";
import { Ticket } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const TicketTable = ({ tickets }: { tickets: Ticket[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const columns: { key: keyof Ticket; label: string }[] = [
    { key: "title", label: "Tickets" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created" },
  ];
  const handleOrderChange =
    (key: keyof Ticket, direction: "asc" | "desc") => () => {
      const params = new URLSearchParams(searchParams.toString()); // clone existing
      params.set("orderBy", key);
      params.set("orderDirection", direction);

      router.push(`/tickets?${params.toString()}`);
    };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Table.Root variant="surface" className="mt-5" layout={"fixed"}>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.Cell key={column.key} className="font-semibold">
                <div className="flex items-center gap-2">
                  {column.label}
                  <div>
                    {" "}
                    <IoMdArrowDropup
                      className="cursor-pointer"
                      onClick={handleOrderChange(column.key, "asc")}
                    />
                    <IoMdArrowDropdown
                      className="cursor-pointer"
                      onClick={handleOrderChange(column.key, "desc")}
                    />
                  </div>
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tickets?.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell className="cursor-pointer hover:underline">
                <CostumLink href={`/tickets/${ticket.id}`}>
                  {ticket.title}
                </CostumLink>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={ticket.status} />
              </Table.Cell>
              <Table.Cell>{ticket.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Suspense>
  );
};

export default TicketTable;
