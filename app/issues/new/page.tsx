"use client";

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

function NewIssuePage() {
  return (
    <div className="max-w-xg space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Título" />
      </TextField.Root>
      <SimpleMDE placeholder="Descrição" />
      <Button>Criar Nova Issue</Button>
    </div>
  );
}

export default NewIssuePage;
