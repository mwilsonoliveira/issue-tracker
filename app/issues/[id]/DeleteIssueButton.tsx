"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialogTrigger>
        <Button color="red">Deletar Issue</Button>
      </AlertDialogTrigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirmar</AlertDialog.Title>
        <AlertDialog.Description>
          Tem certeza que você quer deletar essa issue? Essa ação não pode ser
          desfeita.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                //necessário fazer um refresh para limpar o cache do Next
                router.refresh();
              }}
            >
              Deletar Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
