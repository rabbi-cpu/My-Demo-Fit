
import Image from "next/image";
import Link from "next/link";
import logo from "@/asset/logo.png";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#090a0c] text-white">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-8 sm:px-6">
                <Link
                    href="/"
                    className="flex items-center"
                >
                    <Image
                        src={logo}
                        alt="FITLOG"
                        width={40}
                        height={40}
                        className="h-9 w-9 object-contain"
                    />
                    <span className="ml-2 text-lg font-black">
                        FITLOG
                    </span>
                </Link>
                <p className="text-xs text-gray-500 sm:text-sm">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
