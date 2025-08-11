"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconSettings } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Settings } from "@/lib/types";
import { useAtom } from "jotai";
import { settingsState } from "@/lib/jotai/random-word/state";

function SettingItem({
  id,
  checked,
  onCheckedChange,
  children,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: CheckedState) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-x-2 w-full">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="grow">
        {children}
      </Label>
    </div>
  );
}

export default function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useAtom(settingsState);
  const [settingsTemp, setSettingsTemp] = useState<Settings>(settings);

  useEffect(() => {
    if (!isOpen) {
      setSettingsTemp(settings);
    }
  }, [isOpen, settings]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-full border size-16 flex justify-center items-center">
        <IconSettings size={32} color="#666666" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden" />
        <div className="space-y-4">
          <h3 className="font-bold text-xl">Settings</h3>
          <div className="flex gap-y-4 flex-wrap">
            <SettingItem
              id="shouldShowMeanings"
              checked={settingsTemp.shouldShowMeanings}
              onCheckedChange={(checked: CheckedState) =>
                setSettingsTemp((prev) => ({ ...prev, shouldShowMeanings: checked === true }))
              }
            >{`Show meanings by default`}</SettingItem>
            <SettingItem
              id="shouldShowSentences"
              checked={settingsTemp.shouldShowSentences}
              onCheckedChange={(checked: CheckedState) =>
                setSettingsTemp((prev) => ({ ...prev, shouldShowSentences: checked === true }))
              }
            >{`Show sentences by default`}</SettingItem>
            <SettingItem
              id="shouldShowTags"
              checked={settingsTemp.shouldShowTags}
              onCheckedChange={(checked: CheckedState) =>
                setSettingsTemp((prev) => ({ ...prev, shouldShowTags: checked === true }))
              }
            >{`Show tags by default`}</SettingItem>
            <SettingItem
              id="shouldShowLevel"
              checked={settingsTemp.shouldShowLevel}
              onCheckedChange={(checked: CheckedState) =>
                setSettingsTemp((prev) => ({ ...prev, shouldShowLevel: checked === true }))
              }
            >{`Show a level by default`}</SettingItem>
          </div>
        </div>
        <Button
          onClick={() => {
            setIsOpen(false);
            setSettings(settingsTemp);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
