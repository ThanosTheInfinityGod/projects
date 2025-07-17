import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Image
        src="/codesage-logo.jpg"
        alt="CodeSage Logo"
        width={120}
        height={120}
        className="mb-6"
      />
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        CodeSage AI
      </h1>
      <p className="text-lg sm:text-xl max-w-xl mb-8">
        From idea to web app in minutes. Describe it. We'll build it. You pretend it was your idea.
      </p>
      <a
        href="/dashboard"
        className="inline-block bg-black text-white dark:bg-white dark:text-black font-medium px-6 py-3 rounded-full hover:opacity-80 transition"
      >
        Get Started
      </a>
    </main>
  );
}
