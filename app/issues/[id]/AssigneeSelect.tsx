"use client";

import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Atrelar..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Sugestões</Select.Label>
          <Select.Item value="1">Marcos Wilson</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
