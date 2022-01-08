import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

const Dashboard = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="flex py-6 px-20 max-w-5xl mx-auto">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <p>
        {!isLoading &&
          (user?.is_subscribed
            ? `Subscribed: ${user.interval}`
            : "Not subscribed")}
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
