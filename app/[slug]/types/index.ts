import { ReactNode } from "react";

export interface ILayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}