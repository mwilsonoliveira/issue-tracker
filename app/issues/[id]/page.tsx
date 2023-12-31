import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

//Os ids são strings porque nas URLs eles são
//sempre strings que futuramente são passados para number
interface Props {
  params: { id: string };
}

//Requisição com o react cache
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  //Outra vez que houver a mesma call para o banco ele pega
  //do cache ao invés de fazer a mesma requisição
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  //Aqui a responsabilidade que antes ficava nesse
  //componente foi passada para esses dois, que são
  //os detalhes e o botão correspondente à ação
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Detalhes da issue " + issue?.id,
  };
}

export default IssueDetailPage;
