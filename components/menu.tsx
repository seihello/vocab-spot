import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconCategory } from "@tabler/icons-react";

export default function Menu() {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full border size-16 flex justify-center items-center">
        <IconCategory size={32} color="#666666" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden" />
        This is a menu.
      </DialogContent>
    </Dialog>
  );
}
