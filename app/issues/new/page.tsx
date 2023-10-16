"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";

function NewIssuePage() {
  return (
    <div className="max-w-xg space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Título" />
      </TextField.Root>
      <TextArea placeholder="Descrição" />
      <Button>Criar Nova Issue</Button>
    </div>
  );
}

export default NewIssuePage;
