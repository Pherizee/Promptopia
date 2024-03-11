"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface SessionProviderProps {
  children: React.ReactNode;
  session: Session;
}

const Provider = ({ children, session }: SessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
