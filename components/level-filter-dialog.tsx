import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconNumber123 } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  defaultSelectedLevels: string[];
  onUpdate: (selectedLevels: string[]) => void;
};

export default function LevelFilterDialog({ defaultSelectedLevels, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLevelsTemp, setSelectedLevelsTemp] = useState<string[]>(defaultSelectedLevels);

  useEffect(() => {
    if (!isOpen) {
      setSelectedLevelsTemp(defaultSelectedLevels);
    }
  }, [isOpen, defaultSelectedLevels]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-full border size-16 flex justify-center items-center">
        <IconNumber123 size={32} color="#666666" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden" />
        <div className="space-y-4">
          <h3 className="font-bold text-xl">Levels</h3>
          <div className="flex gap-y-4 flex-wrap">
            {["1", "2", "3", "4", "5"].map((levelOption, index) => (
              <div key={index} className="flex items-center justify-center gap-x-2 w-1/5">
                <Checkbox
                  id={levelOption}
                  name={levelOption}
                  checked={selectedLevelsTemp.includes(levelOption)}
                  onCheckedChange={(checked: CheckedState) =>
                    setSelectedLevelsTemp((prev) => {
                      if (checked === true && !prev.includes(levelOption)) {
                        return [...prev, levelOption];
                      } else if (checked === false && prev.includes(levelOption)) {
                        return prev.filter((prevTag) => prevTag !== levelOption);
                      }
                      return prev;
                    })
                  }
                />
                <Label htmlFor={levelOption} className="grow">
                  {levelOption}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => {
            setIsOpen(false);
            onUpdate(selectedLevelsTemp);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
