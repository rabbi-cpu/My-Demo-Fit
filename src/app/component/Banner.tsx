
import Image from 'next/image';
import Link from 'next/link';
import Ban from '@/asset/banner.png';

const Banner = () => {
    return (
        <div className="w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6">
            <div
                className="bg-[#15171c] border border-white/10 rounded-2xl
                            px-6 py-10
                            sm:px-8 sm:py-12
                            lg:px-12 lg:py-16
                            flex flex-col lg:flex-row
                            items-center justify-between
                            gap-10"
            >

                <div className="w-full lg:w-1/2 text-center lg:text-left">

                    <h3 className="text-lime-400 font-semibold">
                        WORKOUT LIBRARY
                    </h3>

                    <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl pt-4 leading-tight">
                        TRAIN WITH INTENT.
                        <br className="hidden sm:block" />
                        LOG EVERY SET.
                    </h1>

                    <p className="pt-4 text-gray-400 text-sm sm:text-base leading-7">
                        FitLog is a dark, no-nonsense gym companion: pick a lift,
                        lock it into today&apos;s plan, and watch the week&apos;s
                        work add up.
                    </p>

                    <div className="pt-6">
                        <a
                            href="#library"
                            className="inline-block rounded-lg bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
                        >
                            Browse Workouts
                        </a>
                    </div>

                </div>

                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <Image
                        src={Ban}
                        alt="FitLog workout"
                        className="w-full max-w-md lg:max-w-lg h-auto"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;
