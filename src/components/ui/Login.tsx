import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

const Login = () => {
  // CHANGE BELOW WITH CAUTION, YOU MAY NEED TO UPDATE [...nextauth].ts
  // TODO: fix this to be better with type safety
  //       maybe figure out how to get the styles from nextauth itself?
  return (
    <button
      onClick={() => signIn("discord")}
      className="btn inline-flex justify-center gap-4 border-[#7289da] bg-[#7289da]"
    >
      <FaDiscord className="text-3xl" aria-hidden={true} /> Login with Discord
    </button>
  );
};

export default Login;
