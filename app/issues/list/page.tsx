import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  //Pegando todos os status do objeto
  const statuses = Object.values(Status);
  //Validando se o status passado está no array de status
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  //Caso esteja e só assim ele vai para o prisma, se não
  //vai filtrar por todos ou undefined.

  //Ao invés de passar um parâmetro por vez
  //dá pra usar assim com colchetes e o objeto
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

//Forçando o next a buildar o arquivo como dinâmico ao
//invés de estático, o que faz a informação ser mostrada
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Lista",
  description: "Veja todas as issues dos projetos",
};

export default IssuesPage;
