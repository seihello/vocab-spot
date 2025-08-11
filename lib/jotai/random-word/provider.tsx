"use client";

import { Provider } from "jotai";

type Props = {
  children: React.ReactNode;
};

export function RandomWordProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}
