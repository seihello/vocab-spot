import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconTag } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useAtom } from "jotai";
import { selectedTagsState } from "@/jotai/random-word/state";

type Props = {
  tagOptions: string[];
};

export default function TagFilterDialog({ tagOptions }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsState);
  const [selectedTagsTemp, setSelectedTagsTemp] = useState<string[]>(selectedTags);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTagsTemp(selectedTags);
    }
  }, [isOpen, selectedTags]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-full border size-16 flex justify-center items-center">
        <IconTag size={32} color="#666666" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden" />
        <div className="space-y-4">
          <h3 className="font-bold text-xl">Tags</h3>
          <div className="flex gap-y-4 flex-wrap">
            {tagOptions.map((tagOption, index) => (
              <div key={index} className="flex items-center justify-center gap-x-2 w-1/3">
                <Checkbox
                  id={tagOption}
                  name={tagOption}
                  checked={selectedTagsTemp.includes(tagOption)}
                  onCheckedChange={(checked: CheckedState) =>
                    setSelectedTagsTemp((prev) => {
                      if (checked === true && !prev.includes(tagOption)) {
                        return [...prev, tagOption];
                      } else if (checked === false && prev.includes(tagOption)) {
                        return prev.filter((prevTag) => prevTag !== tagOption);
                      }
                      return prev;
                    })
                  }
                />
                <Label htmlFor={tagOption} className="grow">
                  {tagOption}
                </Label>
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
