import { useCallback, useEffect, useState, useRef } from "react";
import { getPosts } from "../fetchers/posts";
import BlogPreview from "../components/blogPreview";
import heroImage from "../../src/assets/meditation.jpeg";
import heroImageSmall from "../../src/assets/meditation-small.jpeg";
import { useShare } from "../components/shareContext";
import { Share } from "../types/share";
import { Helmet } from "react-helmet";

const title = "Discover Mindfulness: Articles to Guide You";
const description = "Our blog section on mindfullness";

// Select a random color combination
const Blogs = () => {
  const [error, setError] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const [share, setShare] = useShare();
  const { posts } = share;
  // Add a loader ref to observe
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(async () => {
    if (loading || !posts.hasMore) return;
    setLoading(true);
    try {
      const {
        posts: { posts, cursor, hasMore },
      } = await getPosts(share.posts.after);
      setShare((prev: Share) => {
        return {
          ...prev,
          posts: {
            posts: prev.posts?.posts?.length
              ? [...prev.posts.posts, ...posts]
              : posts,
            after: cursor,
            hasMore: hasMore,
          },
        };
      });
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Unable to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [share.posts, loading]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && share.posts.hasMore) {
          fetchPosts();
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchPosts, share.posts.hasMore]);

  useEffect(() => {
    if (!posts?.posts?.length && share.posts.hasMore && isFirstRender.current) {
      fetchPosts();
      isFirstRender.current = false;
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* OpenGraph meta tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={heroImage} />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full">
        <div className="rounded-sm shadow-lg flex flex-col md:flex-row bg-gradient-to-br from-blue-900 via-purple-700 to-red-500 w-full relative min-h-64">
          <img
            src={heroImage}
            decoding="async"
            className="absolute opacity-50 w-full h-full object-cover rounded-sm"
            srcSet={`${heroImageSmall} 480w, ${heroImage} 1280w`}
            alt="Person meditating in a peaceful environment, representing mindfulness and mental wellness"
          />
          <h1
            className="text-red-50 drop-shadow-[0_3px_1px_rgba(0,0,0,0.5)] p-6 flex flex-col items-center"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Explore The Mindfulness Journey: A variety of articles to guide your
            Path towards a balanced life.
          </h1>
        </div>
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-center mt-4 w-full">
          {posts?.posts?.map((item) => (
            <BlogPreview key={item.id} item={item} />
          ))}
        </div>
        {/* Loader element that triggers more posts when visible */}
        <div
          ref={loaderRef}
          className="h-10 w-full flex items-center justify-center my-4"
        >
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
          )}
        </div>

        {!share.posts.hasMore && posts?.posts?.length > 0 && (
          <div className="text-gray-500 my-8">No more posts to load</div>
        )}
      </div>
    </>
  );
};

export default Blogs;
