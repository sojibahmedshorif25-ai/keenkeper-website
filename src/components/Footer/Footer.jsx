import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '../../assets/logo-xl.png';

const Footer = () => {
    return (
        <footer className="bg-[#244D3F] text-white mt-16">

            <div className="max-w-[80%] mx-auto px-4 py-16 text-center">

                <img src={logo} alt="" className="mx-auto" />

                <p className="mt-3 text-sm text-gray-200 mx-auto">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                <div className="mt-6">
                    <p className="font-semibold mb-3">Social Links</p>

                    <div className="flex justify-center gap-4">

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#244D3F] hover:bg-gray-200 transition"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#244D3F] hover:bg-gray-200 transition"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#244D3F] hover:bg-gray-200 transition"
                        >
                            <FaTwitter />
                        </a>

                    </div>
                </div>

                <div className="mt-10 border-t border-[#3A6B5A] pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 gap-4">

                    <p>© 2026 KeenKeeper. All rights reserved.</p>

                    <div className="flex gap-6">
                        <span className="hover:underline cursor-pointer">Privacy Policy</span>
                        <span className="hover:underline cursor-pointer">Terms of Service</span>
                        <span className="hover:underline cursor-pointer">Cookies</span>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;