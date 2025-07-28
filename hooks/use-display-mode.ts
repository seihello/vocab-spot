"use client";

import { useEffect, useState } from "react";

export function useDisplayMode() {
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    const isPwa =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;
    setIsPwa(isPwa);
  }, []);

  return { isPwa };
}
