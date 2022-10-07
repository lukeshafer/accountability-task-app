import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import BaseLayout from "$components/layouts/BaseLayout";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import Login from "$components/ui/Login";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <BaseLayout title="Task App">
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Accountability Tasks</h1>
            <p className="py-6 text-lg">
              Stay on task, <b>with your friends!</b>
            </p>
            {!session && status !== "loading" && <Login></Login>}
            {status === "loading" && <span className="btn btn-disabled w-32" />}
            {session && status === "authenticated" && (
              <Link href="/home">
                {/* TODO: Create "HOME" component */}
                <a className="btn btn-primary">My Tasks</a>
              </Link>
            )}
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Home;
