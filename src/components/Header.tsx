import { Field, Label, Switch } from "@headlessui/react";
import { useState } from "react";

export default function Header() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Field className="flex flex-row items-center justify-end gap-2 text-xs">
      <Label className="text-xs">Admin</Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group inline-flex h-4 w-10 items-center rounded-full bg-gray-200 transition data-[checked]:bg-[#88944E]"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6 group-data-[checked]:bg-[#E8FD7D]" />
      </Switch>
      <Label className="text-xs">User</Label>
    </Field>
  );
}
