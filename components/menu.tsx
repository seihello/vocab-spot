import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconCategory } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  tags: string[];
};

export default function Menu({ tags }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full border size-16 flex justify-center items-center">
        <IconCategory size={32} color="#666666" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden" />
        <div className="space-y-4">
          <h3 className="font-bold text-xl">Tags</h3>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center justify-center gap-x-1">
                <input type="checkbox" id={tag} name={tag} />
                <Label htmlFor={tag}>{tag}</Label>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
