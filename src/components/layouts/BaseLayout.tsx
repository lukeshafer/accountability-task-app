import Head from "next/head";
import Nav from "$components/ui/Nav";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
} & PropsWithChildren;

export default function Layout({ children, title }: Props) {
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

      {children}
    </>
  );
}
