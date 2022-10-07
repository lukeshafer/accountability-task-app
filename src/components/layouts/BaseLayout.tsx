import { useSession } from "next-auth/react";
import Head from "next/head";
import Nav from "$components/ui/Nav";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="An app for tracking your tasks, and making sure your friends do too"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="grid min-h-screen w-screen place-content-center bg-base-200">
        {children}
      </main>
    </>
  );
}
