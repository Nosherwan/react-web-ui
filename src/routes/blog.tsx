import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../fetchers/posts";
import { Post } from "../types/post";
import { format } from "date-fns";
import Tags from "../components/tags";
import { Helmet } from "react-helmet";

const Blog = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  const fetchPosts = async (postSlug: string) => {
    try {
      setLoading(true);
      const response = await getPost(postSlug);
      setPost(response.post);
      console.log("🐌 ", response);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPosts(slug);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Post not found</h1>
        <p>
          The post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt ?? ""} />

        {/* OpenGraph meta tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt ?? ""} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt ?? ""} />
        {post.image && <meta name="twitter:image" content={post.image} />}
      </Helmet>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header section with image */}
        {post.image && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post metadata */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 border-b pb-2">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">By {post.author}</span>
            <span className="mr-4">•</span>
            <time
              dateTime={new Date(Number(post.published_on) * 1000).toString()}
            >
              {post.published_on
                ? format(
                    new Date(Number(post.published_on) * 1000),
                    "d MMMM yyyy",
                  )
                : "Publication date unavailable"}
            </time>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            )}
            <Tags tags={post.tags} />
          </div>

          {post.excerpt && (
            <div className="text-xl text-gray-600 italic mb-8 border-l-4 border-gray-300 pl-4">
              {post.excerpt}
            </div>
          )}
        </div>

        <div
          className="prose prose-lg max-w-none text-justify content-container"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-6 border-t text-sm">
          <p>
            Last updated:{" "}
            {format(new Date(Number(post.modified_on) * 1000), "d MMMM yyyy")}
          </p>
          {post.modified_by && <p>Updated by: {post.modified_by}</p>}
        </div>
      </article>
    </>
  );
};

export default Blog;
