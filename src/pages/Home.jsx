import { ArrowDownFromLine, Filter, ArrowDown01 } from "lucide-react";
import BlogList from "../components/BlogList";

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section
                className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/src/assets/hero-bg.jpg')",
                }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Container for Grid-System */}
                <div className="relative z-10 container mx-auto grid grid-cols-12 h-full">
                    {/* Headline (6 col, left aligned, vertical centered) */}
                    <div className="col-span-6 flex flex-col justify-center">
                        <h1 className="text-8xl font-heading text-white font-black leading-normal">
                            Git Lost – The Wanders of a Digital Nomad
                        </h1>
                    </div>

                    {/* Arrow (6 cpl, horizontal center, vertical bottom) */}
                    <div className="col-span-6 h-full flex flex-col justify-end items-center ">
                        <ArrowDownFromLine
                            size={350}
                            strokeWidth={0.5}
                            color="white"
                            className="animate-soft-bounce"
                        />
                    </div>
                </div>
            </section>

            {/* Blogposts Section */}
            <section className="blog-section py-14">
                <div className="container mx-auto">
                    <h2 className="font-heading font-black text-5xl pb-10">
                        Nomad Chronicles
                    </h2>
                    <div className="flex flex-row justify-between border-b border-dark pb-5">
                        <Filter />
                        <ArrowDown01 />
                    </div>

                    {/* Hier kommen später die Post-Karten */}
                    <BlogList />
                </div>
            </section>
        </div>
    );
};

export default Home;
