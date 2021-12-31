import { supabase } from "../utils/supabase";
import  Link  from "next/link";

export default function Home({ lesson }) {
  console.log({ lesson });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {lesson.map((lesson) => {
        return (
          <Link href={`/${lesson.id}`} key={lesson.id}>
            <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
              <p >{lesson.title}</p>
            </a>
          </Link>
        );
      })}
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
