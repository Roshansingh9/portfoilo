import React, { useEffect, useState } from "react";

const MediumLatestArticles = ({ username = "testuser", maxItems = 5 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Multiple CORS proxy options to try
        const proxies = [
          "https://api.allorigins.win/get?url=",
          "https://corsproxy.io/?",
          "https://api.codetabs.com/v1/proxy?quest=",
        ];

        const rssUrl = `https://medium.com/feed/@${username}`;
        let success = false;
        let lastError = null;

        // Try each proxy until one works
        for (const proxy of proxies) {
          try {
            const response = await fetch(proxy + encodeURIComponent(rssUrl), {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
              },
            });

            if (!response.ok) {
              throw new Error(
                `HTTP ${response.status}: ${response.statusText}`
              );
            }

            const data = await response.json();
            let xmlContent = data.contents || data;

            // Handle different proxy response formats
            if (typeof xmlContent !== "string") {
              xmlContent = JSON.stringify(xmlContent);
            }

            // Parse XML manually (simple parser for RSS)
            const articles = parseRSSFeed(xmlContent);

            if (articles && articles.length > 0) {
              setArticles(articles.slice(0, maxItems));
              success = true;
              break;
            }
          } catch (err) {
            lastError = err;
            console.log(`Proxy ${proxy} failed:`, err.message);
            continue;
          }
        }

        if (!success) {
          throw lastError || new Error("All proxy attempts failed");
        }
      } catch (err) {
        console.error("Feed fetch error:", err);
        setError(
          `Unable to load Medium articles. This might be due to CORS restrictions or network issues. Error: ${err.message}`
        );

        // Load mock data for demonstration
        setArticles(getMockArticles());
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [username, maxItems]);

  // Simple RSS parser
  const parseRSSFeed = (xmlString) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      // Check for XML parsing errors
      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error("Invalid XML format");
      }

      const items = xmlDoc.querySelectorAll("item");
      const articles = [];

      items.forEach((item, index) => {
        if (index < maxItems) {
          const title = item.querySelector("title")?.textContent || "Untitled";
          const link = item.querySelector("link")?.textContent || "#";
          const description =
            item.querySelector("description")?.textContent || "";
          const pubDate =
            item.querySelector("pubDate")?.textContent ||
            new Date().toISOString();
          const guid =
            item.querySelector("guid")?.textContent || `${link}-${index}`;

          articles.push({
            title: cleanText(title),
            link,
            description,
            pubDate,
            guid,
          });
        }
      });

      return articles;
    } catch (err) {
      console.error("RSS parsing error:", err);
      return [];
    }
  };

  // Clean text content
  const cleanText = (text) => {
    return text
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  };

  // Mock data for demonstration when real feed fails
  const getMockArticles = () => [
    {
      title: "Understanding React Hooks: A Complete Guide",
      link: "https://medium.com/@example/react-hooks-guide",
      description:
        "React Hooks have revolutionized how we write components. In this comprehensive guide, we'll explore useState, useEffect, and custom hooks...",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      guid: "mock-1",
    },
    {
      title: "Building Modern Web Applications with Next.js",
      link: "https://medium.com/@example/nextjs-guide",
      description:
        "Next.js provides an excellent framework for building production-ready React applications. Learn about SSR, routing, and optimization...",
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      guid: "mock-2",
    },
    {
      title: "The Future of Web Development: Trends to Watch",
      link: "https://medium.com/@example/web-dev-trends",
      description:
        "Explore the latest trends shaping web development, from AI integration to new JavaScript frameworks and progressive web apps...",
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      guid: "mock-3",
    },
  ];

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

  // Function to extract image from article content
  const getArticleImage = (htmlContent) => {
    if (!htmlContent) return null;

    const imgMatches = htmlContent.match(/<img[^>]+src="([^">]+)"[^>]*>/g);
    if (!imgMatches) return null;

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

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-3xl md:text-4xl font-bold text-white mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Latest Articles
          </h2>
          <p className="text-gray-400 text-lg">
            from Medium {error && "(Demo Mode)"}
          </p>
        </div>

        {/* Error Message (if any) */}
        {error && (
          <div className="bg-yellow-900 bg-opacity-20 border border-yellow-600 rounded-xl p-4 mb-8 text-yellow-300">
            <h4 className="font-semibold mb-2">Note:</h4>
            <p className="text-sm">
              Unable to fetch live Medium articles due to CORS restrictions.
              Showing demo content instead. To fix this in production, consider
              using a server-side proxy or RSS aggregation service.
            </p>
          </div>
        )}

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
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {article.title}
                    </a>
                  </h3>

                  {/* Article Preview */}
                  {previewText && (
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
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
        {articles.length === 0 && !loading && (
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
