import { Pen, Trash2, House, ArrowRightFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/posts/${id}`
                );
                if (!response.ok)
                    throw new Error("Fehler beim Laden des Posts");

                const data = await response.json();
                setPost(data); // Speichert den einzelnen Post
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // Wird neu ausgeführt, wenn sich die ID ändert

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="detail-container">
            {/* Hero Section */}
            <section
                className="relative w-full bg-cover h-96 bg-center bg-no-repeat flex items-end px-4"
                style={{
                    backgroundImage: `url(${post.cover})`,
                }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content Wrapper */}
                <div className="container mx-auto z-10 text-white py-8">
                    {/* Titel */}
                    <h1 className="text-6xl font-heading font-black leading-normal">
                        {post.title}
                    </h1>
                    {/* Autor & Datum */}
                    <p className="text-lg text-white mt-2">
                        By {post.author} •{" "}
                        {new Date(post.date).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Blogposts Section */}
            <section className="blog-section py-14">
                <div className="container mx-auto">
                    {/* Categories, Edit, Delete */}
                    <div className="flex flex-row justify-between  pb-8">
                        <div>Catergories placeholder</div>
                        <div className="flex flex-row gap-5 text-primary">
                            <Pen />
                            <Trash2 />
                        </div>
                    </div>
                    {/* Content */}
                    <div className="blog-content grid md:w-8/12 mx-auto">
                        <p>
                            If there's one place that completely surprised me,
                            it's Madeira. I had heard about the island’s
                            dramatic cliffs and lush landscapes, but nothing
                            prepared me for how breathtaking it actually is.
                            From sunrise hikes above the clouds to sipping
                            Poncha in a tiny seaside bar, Madeira feels like a
                            secret paradise for adventurers and digital nomads
                            alike.
                        </p>
                        <h3>First Impressions: More Than Just an Island</h3>
                        <p>
                            When I arrived in Funchal, Madeira’s charming
                            capital, I instantly knew this trip was going to be
                            different. The warm ocean breeze, the scent of
                            tropical flowers, and the sight of banana trees
                            growing along the roads—it felt like stepping into a
                            dream. The first thing I did? Hike the famous Pico
                            do Arieiro to Pico Ruivo trail. The moment I reached
                            the summit and watched the sunrise above a sea of
                            clouds, I realized: Madeira is pure magic.
                        </p>
                        <p>Why Madeira?</p>
                        <ul>
                            <li>Perfect year-round climate (16-26°C)</li>
                            <li>Epic hikes with insane views</li>
                            <li>
                                A mix of mountains, forests, and ocean—all in
                                one place
                            </li>
                        </ul>
                        <p>Top Highlights (So Far!):</p>
                        <ul>
                            <li>
                                Pico do Arieiro sunrise hike – 100% worth the
                                early wake-up call
                            </li>
                            <li>
                                Cabo Girão – Standing on a glass platform 580m
                                above the ocean? Wild.
                            </li>
                            <li>
                                Fanal Forest – A mystical, fog-covered forest
                                straight out of a fairytale
                            </li>
                        </ul>
                        <h3>The Unexpected Adventures</h3>
                        <p>
                            One night, I found myself at a small local bar,
                            chatting with an old fisherman who insisted I try
                            Poncha, the island’s signature drink. Made with
                            sugarcane rum, honey, and lemon, it packs a punch.
                            Maybe a little too much—let’s just say my next
                            morning’s hike started later than planned. Madeira
                            is also a surfer’s dream. While I’m far from a pro,
                            I rented a board in Jardim do Mar and tried catching
                            a few waves. Spoiler: I mostly wiped out. But
                            watching locals effortlessly carve through the waves
                            made me want to stay longer, just to get better.
                        </p>
                        <p>More Unforgettable Moments:</p>
                        <ul>
                            <li>
                                Canyoning through waterfalls (nothing like
                                jumping into icy pools to wake you up!)
                            </li>
                            <li>
                                Dolphin watching at sunset – We spotted a whole
                                pod, and I swear they were racing our boat.
                            </li>
                            <li>
                                Trying ‘Bolo do Caco’ garlic bread – So good I
                                considered smuggling some home.
                            </li>
                        </ul>
                        <p>Best Time to Visit?</p>
                        <p>
                            Madeira is called “the island of eternal spring”, so
                            honestly, anytime. But April to October is perfect
                            for outdoor adventures.
                        </p>
                        <h3> Final Thoughts: Stay Longer Than Planned</h3>
                        <p>
                            I booked a one-week trip to Madeira. I stayed for
                            three. This island has a way of making you slow
                            down, take a deep breath, and just enjoy the moment.
                            If you love adventure, good food, and working
                            remotely with epic ocean views, Madeira should be on
                            your list. Would I go back? Without a doubt.
                        </p>
                    </div>
                    {/* Placeholder for more images if needed */}
                    <div className="flex gap-8 py-4">
                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                            Image 1
                        </div>
                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                            Image 2
                        </div>
                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                            Image 3
                        </div>
                    </div>
                    {/* Navigation */}
                    <div className="flex flex-row justify-between  pt-8">
                        <House className="text-primary" />
                        <div className="flex flex-row gap-5 text-primary">
                            <p>
                                Next: Puerto Rico – A Love Letter to La Isla del
                                Encanto
                            </p>
                            <ArrowRightFromLine />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostDetail;
