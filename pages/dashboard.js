import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const Dashboard = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const loadPortal = async () => {
    const { data } = await axios.get("/api/portal");
    router.push(data.url);
  };

  return (
    <div className="flex py-6 px-20 max-w-5xl mx-auto">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <p>
        {!isLoading && (
          <div>
            <p className="mb-6">
              {user?.is_subscribed
                ? `Subscribed: ${user.interval}`
                : "Not subscribed"}
            </p>
            {user?.is_subscribed ? (
              <button onClick={loadPortal}>Manage subscribe</button>
            ) : (
              <Link href="/pricing">

              <a>Let`s upgrade!!</a>
              </Link>
            )}
          </div>
        )}
      </p>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

export default Dashboard;
