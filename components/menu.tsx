import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconCategory } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  tags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Menu({ tags, setSelectedTags }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTagsTemp, setSelectedTagsTemp] = useState<string[]>([]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <Checkbox
                  id={tag}
                  name={tag}
                  onCheckedChange={(checked: CheckedState) =>
                    setSelectedTagsTemp((prev) => {
                      if (checked === true && !prev.includes(tag)) {
                        return [...prev, tag];
                      } else if (checked === false && prev.includes(tag)) {
                        return prev.filter((prevTag) => prevTag !== tag);
                      }
                      return prev;
                    })
                  }
                />
                <Label htmlFor={tag}>{tag}</Label>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => {
            setIsOpen(false);
            setSelectedTags(selectedTagsTemp);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
