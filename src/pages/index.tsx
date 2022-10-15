import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { trpc } from "$utils/trpc";
import BaseLayout from "$components/layouts/BaseLayout";
import Todo from "$modules/todo/Todo";
import Login from "$components/ui/Login";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const tasks = trpc.useQuery(["task.getAll"]);

  return (
    <BaseLayout title="Task App">
      <main className="justify-content-center hero grid min-h-screen w-screen content-start bg-base-200 pt-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {!session && status !== "loading" && (
              <>
                <h1 className="text-5xl font-bold">Accountability Tasks</h1>
                <p className="py-6 text-lg">
                  Stay on task, <b>with your friends!</b>
                </p>
                <Login></Login>
              </>
            )}
            {status === "loading" && <span className="btn btn-disabled w-32" />}
            {session && status === "authenticated" && <Todo tasks={tasks} />}
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Home;
