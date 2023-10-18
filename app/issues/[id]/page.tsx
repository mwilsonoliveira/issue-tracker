//Os ids são strings porque nas URLs eles são

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

//sempre strings que futuramente são passados para number
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  //Caso o usuário digite algo que não seja um número na rota
  //ele é redirecionado para a página 404
  if (typeof params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
