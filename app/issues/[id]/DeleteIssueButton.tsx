"use client";

import { Spinner } from "@/app/components";
import {
  AlertDialog,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      //necessário fazer um refresh para limpar o cache do Next
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialogTrigger>
          <Button color="red" disabled={isDeleting}>
            Deletar Issue
            {isDeleting && <Spinner />}
          </Button>
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
              <Button color="red" onClick={deleteIssue}>
                Deletar Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Erro</AlertDialog.Title>
          <AlertDialog.Description>
            Essa issue não pode ser deletada!
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
