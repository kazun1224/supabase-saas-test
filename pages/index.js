import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useUser } from "../context/user";

export default function Home({ lesson }) {
  // console.log(supabase.auth.user());
  // console.log({ lesson });
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">レッスン</h1>
      <p className="font-bold text-2xl">
        これはsupabaseからデータを取ってきて表示するSAASです。
      </p>
      <div className="my-20">
        {lesson.map((lesson) => {
          return (
            <Link href={`/${lesson.id}`} key={lesson.id}>
              <a className="w-1/3 p-8 h-40 mb-4 rounded shadow text-xl flex bg-green-400">
                <p>{lesson.title}</p>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: lesson } = await supabase.from("lesson").select("*");

  return {
    props: {
      lesson,
    },
  };
};
