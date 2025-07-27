import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconCategory } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  tagOptions: string[];
  defaultSelectedTags: string[];
  onUpdate: (selectedTags: string[]) => void;
};

export default function Menu({ tagOptions, defaultSelectedTags, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTagsTemp, setSelectedTagsTemp] = useState<string[]>(defaultSelectedTags);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTagsTemp(defaultSelectedTags);
    }
  }, [isOpen, defaultSelectedTags]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-full border size-16 flex justify-center items-center">
        <IconCategory size={32} color="#666666" />
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
                  className=""
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
            onUpdate(selectedTagsTemp);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
