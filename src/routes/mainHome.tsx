import React, { useEffect, useState, useCallback, useRef } from "react";
import { getCatalogues, getRandomCatalogue } from "../fetchers/catalogues";
import AppCard from "../components/appCard";
import heroImage from "../../src/assets/meditation.jpeg";
import heroImageSmall from "../../src/assets/meditation-small.jpeg";
import { useShare } from "../components/shareContext";
import { Share } from "../types/share";
import { Catalogue } from "../types/catalogue";
import { Helmet } from "react-helmet";

const title = "A curated list of mindfulness apps and articles";
const description =
  "Discover curated mindfulness and personal growth apps. Find reviews, ratings, and details on apps like Mindvalley, Buddhify, Simple Habit, and more. Improve your wellbeing today.";

const createFilters = (searchValue: string) => {
  const cleanValues = searchValue.split(" ").filter(Boolean);
  console.log("🧪 ", cleanValues);
  const filters: string[][] = [];
  for (const val of cleanValues) {
    filters.push(["title", "ilike", val]);
    filters.push(["tags", "@>", `{${val.toLowerCase()}}`]);
  }
  return filters;
};

// Select a random color combination
const Main = () => {
  const isFirstRender = useRef(true);
  const [randomApp, setRandomApp] = useState<Catalogue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [share, setShare] = useShare();
  const { catalogues } = share;
  const [searchValue, setSearchValue] = useState<string>(
    catalogues.searchTerm || "",
  );
  // Add a loader ref to observe
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchCatalogues = useCallback(
    async (filters: string[][], reset: boolean) => {
      // Skip if already loading or no more catalogues
      if ((loading || !catalogues.hasMore) && !reset) return;

      setLoading(true);
      try {
        const {
          catalogues: { catalogues, cursor, hasMore },
        } = await getCatalogues(filters, reset ? 0 : share.catalogues.after);
        // debugger;
        setShare((prev: Share) => {
          return {
            ...prev,
            catalogues: {
              catalogues:
                prev.catalogues?.catalogues?.length && !reset
                  ? [...prev.catalogues.catalogues, ...catalogues]
                  : catalogues,
              after: cursor,
              hasMore,
              searchTerm: searchValue,
            },
          };
        });
        // if (setRandom) setRandomApp(getRandomApp(catalogues));
        // else setRandomApp(null);
      } catch (err) {
        console.error("Failed to fetch catalogue:", err);
        setError("Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [share.catalogues, loading, searchValue],
  );

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && catalogues.hasMore) {
          const filters = createFilters(searchValue);
          fetchCatalogues(filters, false);
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
  }, [fetchCatalogues, catalogues.hasMore, searchValue]);

  // Initial fetch
  useEffect(() => {
    if (
      !catalogues?.catalogues?.length &&
      catalogues.hasMore &&
      isFirstRender.current
    ) {
      fetchCatalogues([], true);
      fetchRandomCatalogue();
      isFirstRender.current = false;
    }
  }, []);

  const fetchRandomCatalogue = async () => {
    const { randomCatalogue } = await getRandomCatalogue();
    setRandomApp(randomCatalogue);
  };

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    [],
  );

  const handleClear = useCallback(() => {
    setSearchValue("");
    fetchCatalogues([], true);
    fetchRandomCatalogue();
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Process the search value here
      console.log("Search submitted with value:", searchValue);
      try {
        const filters = createFilters(searchValue);
        fetchCatalogues(filters, true);
        if (!searchValue) {
          fetchRandomCatalogue();
        } else {
          setRandomApp(null);
        }
      } catch (error) {
        console.log("❗️: ", error);
      }
    },
    [fetchCatalogues, searchValue],
  );

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
            Mental health matters. Right tools can make a difference. Here you
            can find top apps for stress, sleep, mood tracking & wellness.
          </h1>
        </div>
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <div className="mt-4 mb-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-[#4b5563] relative flex items-center">
              <label htmlFor="search-apps" className="sr-only">
                Search mindfulness and wellness apps
              </label>
              <input
                id="search-apps"
                type="search"
                className="pr-6 px-4 py-2 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchValue}
                onChange={handleSearch}
                aria-label="Search for mindfulness apps"
                placeholder="Search apps..."
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-[90px] text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white font-medium rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out border border-blue-900"
              >
                Search
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600 italic bg-blue-50 p-2 rounded-md shadow-sm">
              <span className="font-medium">Search Tip:</span> Just press empty
              search OR Search for words (e.g music sleep) OR Search for app
              name or names with spaces (e.g headspace calm)
            </div>
          </form>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {randomApp !== null && <AppCard item={randomApp} special={true} />}
          {catalogues?.catalogues?.map((item) => (
            <AppCard key={item.id} item={item} special={false} />
          ))}
        </div>
        {/* Loader element that triggers more items when visible */}
        <div
          ref={loaderRef}
          className="h-10 w-full flex items-center justify-center my-4"
        >
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
          )}
        </div>

        {!catalogues.hasMore && catalogues.catalogues?.length > 0 && (
          <div className="text-gray-500 my-8">No more results</div>
        )}
      </div>
    </>
  );
};

export default Main;
