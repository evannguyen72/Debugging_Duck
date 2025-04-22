import Link from 'next/link';

const Readme = () => {
  return (
    <div className="bg-[#e6f7f4] text-[#2E2F35] font-[Inter] min-h-screen flex flex-col justify-between">
      
      {/* Hero / Main Info Section */}
      <section className="flex-grow flex items-center justify-center px-6 pt-24">
        <div className="max-w-[900px] w-full text-center">
          <h1 className="text-[64px] md:text-[82px] leading-[96px] font-bold">
            Readme Page
          </h1>
          <p className="mt-6 text-xl">
            This is where your project documentation will go.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            You can outline your setup instructions, contribution guidelines, project vision, or feature roadmap here.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-sm flex justify-between items-center px-6 py-4">
        <span>© 2025. All rights reserved.</span>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Create Account
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Readme;
