import Image from "next/image";
import Link from "next/link";

export default function Home() {
  //const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="mb-32 w-full grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <Link
          href="/questions"
          className="group  overflow-hidden relative hover:bg-white rounded-lg border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Questions{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/question.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>
        <Link
          href="/"
          className="group rounded-lg overflow-hidden border relative hover:bg-white border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 flex justify-between"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              quizz{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </div>
          <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/quizz.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>

        <Link
          href="/"
          className="group rounded-lg relative overflow-hidden hover:bg-white border m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Disciplines{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore the Next.js 13 playground.
            </p>
          </div>
          <div className=" absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/discipline.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>

        <Link
          href="/"
          className="group rounded-lg relative overflow-hidden hover:bg-white border border-1 m-2 px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex justify-between"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="z-20">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Users{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </div>

          <div className="absolute lg:relative opacity-20 group-hover:opacity-100">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/assets/images/quizztv.jpg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>
      </div>
    </main>
  );
}


Home.getLayout = function getLayout(page) {
  // Retourner la page sans utiliser le layout RootLayout
  return page;
};