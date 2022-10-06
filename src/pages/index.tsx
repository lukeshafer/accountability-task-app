import type { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import BaseLayout from "$components/layouts/BaseLayout";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <BaseLayout title="Task App">
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {!session && status !== "loading" && (
              <>
                <h1 className="text-5xl font-bold">Accountability Tasks</h1>
                <p className="py-6 text-lg">
                  Keep you <b>and your friends</b> accountable
                </p>
                <Link href="/api/auth/signin">
                  <a className="btn btn-primary">Get Started</a>
                </Link>
              </>
            )}
            {session && status === "authenticated" && (
              <>
                <h1 className="text-5xl font-bold">Hi {session.user?.name}!</h1>
                <div className="flex justify-center gap-4 py-6">
                  <Link href="/home">
                    <a className="btn btn-primary">My Tasks</a>
                  </Link>
                  <button className="btn" onClick={() => signOut()}>
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Home;
