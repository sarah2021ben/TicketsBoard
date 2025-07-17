import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
interface Props {
  status: Status;
}
const MapStatus: Record<
  Status,
  { label: string; color: "blue" | "green" | "orange" }
> = {
  OPEN: { label: "Open", color: "blue" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In progress", color: "orange" },
};

const StatusBadge = ({ status }: Props) => {
  return (
    <Badge color={MapStatus[status].color}>{MapStatus[status].label}</Badge>
  );
};

export default StatusBadge;
