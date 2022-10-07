import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/home">
          <a className="btn btn-ghost text-xl normal-case">Task App</a>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              {/* TODO: replace with <Image /> tag */}
              <img src={session?.user?.image ?? ""} alt="Profile Picture" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
