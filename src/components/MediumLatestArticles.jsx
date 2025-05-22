import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const MediumLatestArticles = ({ username, maxItems = 5 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const CORS_PROXY = "https://api.allorigins.win/get?url=";
        const rssUrl = `https://medium.com/feed/@${username}`;
        const response = await fetch(CORS_PROXY + encodeURIComponent(rssUrl));

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
        });

        const feed = parser.parse(data.contents);

        // Medium RSS structure is: rss > channel > item[]
        const items = feed.rss.channel.item;

        setArticles(items.slice(0, maxItems));
      } catch (err) {
        setError("Failed to load Medium articles: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [username, maxItems]);

  // Function to extract text content from HTML and limit characters
  const getPreviewText = (htmlContent, maxLength = 200) => {
    if (!htmlContent) return "";

    // Remove HTML tags and decode HTML entities
    const textContent = htmlContent
      .replace(/<[^>]*>/g, "")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  // Function to extract image from article content - prioritize cover images
  const getArticleImage = (htmlContent) => {
    if (!htmlContent) return null;

    // Look for images in the content, prioritizing larger ones (likely cover images)
    const imgMatches = htmlContent.match(/<img[^>]+src="([^">]+)"[^>]*>/g);
    if (!imgMatches) return null;

    // Get the first image (usually the cover image in Medium articles)
    const firstImgMatch = imgMatches[0].match(/src="([^">]+)"/);
    return firstImgMatch ? firstImgMatch[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <div className="text-xl text-gray-300">Loading articles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-4">
        <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-xl p-6 text-red-300 max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">Error Loading Articles</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-3xl md:text-4xl font-bold text-white mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Latest Articles
          </h2>
          <p className="text-gray-400 text-lg">from Medium</p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-8">
          {articles.map((article, index) => {
            const imageUrl = getArticleImage(article.description);
            const previewText = getPreviewText(article.description);

            return (
              <div
                key={article.guid || article.link || index}
                className="group bg-[#0D0D0D] bg-opacity-80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-2"
              >
                {/* Article Image */}
                {imageUrl && (
                  <div className="h-64 overflow-hidden bg-gray-800">
                    <img
                      src={imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Article Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-2"
                    >
                      {article.title}
                    </a>
                  </h3>

                  {/* Article Preview */}
                  {previewText && (
                    <p className="text-gray-300 mb-8 leading-relaxed line-clamp-4 text-lg">
                      {previewText}
                    </p>
                  )}

                  {/* Article Meta */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(article.pubDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No articles found for @{username}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediumLatestArticles;
