import initStripe from "stripe";
import { useUser } from "../context/user";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const Pricing = ({ plans }) => {
  // return <pre>{JSON.stringify(plans, null, 10)}</pre>;
  const { user, login, isLoading } = useUser();

  //チェックアウト画面に遷移
  const processSubscription = (planId) => async () => {
    //axiosのエンドポイント
    const { data } = await axios.get(`/api/subscription/${planId}`);
    //@stripe/stripe-jsをインストールしloadStripeで初期設定
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const showSubscribeButton = !!user && !user.is_subscribed;
  const showCreateAccountButton = !user;
  const showManagementSubscriptionButton = !!user && user.is_subscribed;

  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {plans.map((plan) => (
          <div key={plan.id} className="w-80 h-40 rounded px-6 py-6 shadow">
            <h2 className="text-3xl">{plan.name}</h2>
            <p className="text-gray-500">{`${plan.price}円 / ${plan.interval}`}</p>
            {!isLoading && (
              <div>
                {/* showSubscribeButtonを押したらStripeのチェックアウトに行く */}
                {showSubscribeButton && (
                  <button onClick={processSubscription(plan.id)}>
                    Subscribe
                  </button>
                )}
                {showCreateAccountButton && (
                  <button onClick={login}>Create Account</button>
                )}
                {showManagementSubscriptionButton && (
                  <Link href="/dashboard">
                    <a>Go Management screen</a>
                  </Link>
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  //stripeの初期設定
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  // 商品のデータをすべて取得
  const { data: prices } = await stripe.prices.list();

  // 必要なデータを抜粋
  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        currency: price.currency,
      };
    })
  );

  // 安いplanから高いplanに昇順にする関数
  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans,
    },
  };
};

export default Pricing;
