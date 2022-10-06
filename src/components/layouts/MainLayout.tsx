import { PropsWithChildren } from "react";
import BaseLayout from "./BaseLayout";

const MainLayout = ({
  children,
  title,
}: PropsWithChildren & { title: string }) => {
  return (
    <BaseLayout title={title}>
      <main className="grid min-h-screen w-screen place-content-center bg-base-200">
        {children}
      </main>
    </BaseLayout>
  );
};

export default MainLayout;
