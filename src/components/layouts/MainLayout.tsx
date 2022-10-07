import { PropsWithChildren } from "react";
import BaseLayout from "./BaseLayout";
import Nav from "$components/ui/Nav";

type Props = {
  title: string;
} & PropsWithChildren;

const MainLayout = ({ children, title }: Props) => {
  return (
    <BaseLayout title={title}>
      <Nav />
      <main className="grid min-h-screen w-screen place-content-center bg-base-200">
        {children}
      </main>
    </BaseLayout>
  );
};

export default MainLayout;
