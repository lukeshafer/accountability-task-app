import Head from "next/head";
import { PropsWithChildren } from "react";

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
      {children}
    </>
  );
}
