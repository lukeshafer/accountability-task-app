// The Home page is your default place in the app, where you see your task list
import { useSession } from "next-auth/react";
import MainLayout from "$components/layouts/MainLayout";
import AddTaskButton from "$modules/todo/components/AddTaskButton";
import { trpc } from "$utils/trpc";
import Task from "$modules/todo/components/Task";

const Home = () => {
  const { data: session, status } = useSession();

  const { data, isLoading, refetch } = trpc.useQuery(["task.getAll"]);

  if (session) {
    return (
      <MainLayout title={`${session?.user?.name} - Home`}>
        <ul className="grid w-72 content-start justify-center justify-items-center gap-4">
          {data?.map(({ id, title, description, completed }) => (
            <Task
              key={id}
              id={id}
              title={title}
              description={description}
              refetch={refetch}
              completed={completed}
            />
          ))}
          <AddTaskButton refetch={refetch} />
        </ul>
      </MainLayout>
    );
  } else return <MainLayout title="Loading..."></MainLayout>;
};

export default Home;
