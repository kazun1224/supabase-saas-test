import Link from "next/link";
import { useUser } from "../context/user";

export const Nav = () => {
  const { user} = useUser();
  return (
    <nav className="flex py-6 px-20 max-w-5xl mx-auto border-gray-200 ">
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/pricing'>
        <a className="ml-3">Pricing</a>
      </Link>
      <Link href={user ? '/logout' : '/login'}>
        <a className="ml-auto">{user ? 'Logout' : 'Login'}</a>
      </Link>
    </nav>
  );
};
