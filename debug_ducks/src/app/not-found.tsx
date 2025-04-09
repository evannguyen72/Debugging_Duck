import Link from 'next/link';
import Content from '../components/Content';



export default async function NotFound() {
  return (
    <Content>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-200">
          <h2 className="text-3xl font-bold text-teal-600 mb-4">404 - Page Not Found</h2>
          <p className="text-gray-700 mb-2">Oops! We couldn't find the page you were looking for.</p>
          <p className="text-gray-600 mb-6">
            Head back to <Link href="/" className="text-teal-500 hover:underline">the homepage</Link>.
          </p>
          <Link
            href="/"
            className="inline-block bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </Content>
  );
}