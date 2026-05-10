import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-center">

            <h1 className="text-8xl font-bold text-[#244D3F]">404</h1>

            <p className="mt-4 text-gray-500">
                Page not found
            </p>

            <Link
                to="/"
                className="mt-6 bg-[#244D3F] text-white text-xl px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
                Return to Home
            </Link>

        </div>
    );
};

export default ErrorPage;