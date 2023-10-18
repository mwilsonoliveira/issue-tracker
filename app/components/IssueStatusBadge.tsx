// Se o prisma Client for utilizado na aplicação
// é possível gerar automaticamente os tipos, conforme abaixo
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

// Record é uma tipagem utilitária que recebe <key, value>
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

// Maneira mais bonita de receber o tipo do que criar uma interface
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
