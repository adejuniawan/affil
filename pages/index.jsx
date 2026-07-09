import Head from "next/head";
import { useMemo, useState } from "react";

// pages/index.jsx
// One-file affiliate website for Next.js + Vercel.
// Database: Google Sheet published as CSV.
// Vercel env variable needed: GOOGLE_SHEET_CSV_URL

const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "ToolStack Picks",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Simple tool picks for smarter online business decisions.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@yourdomain.com",
  logoLetter: (process.env.NEXT_PUBLIC_SITE_NAME || "ToolStack Picks").charAt(0),
};

const fallbackProducts = [
  {
    name: "Minea",
    category: "Ad Spy Tools",
    badge: "Popular research tool",
    price: "Check site",
    rating: "4.8",
    headline: "Find product and ad ideas faster.",
    shortDescription:
      "A research platform for people who want to study ads, trends, and product angles before spending money on tests.",
    why:
      "It helps reduce blind guessing. You can look at market signals first, then decide which angle is worth testing.",
    bestFor: "Dropshippers, ecommerce founders, media buyers",
    watchOut:
      "Do not copy ads directly. Use it for research, then create your own offer and creative angle.",
    affiliateUrl: "https://example.com/minea-affiliate-link",
    websiteUrl: "https://www.minea.com/",
    imageUrl: "",
    isFeatured: true,
    sortOrder: 1,
    status: "active",
    seoKeyword: "best ad spy tool for ecommerce",
  },
  {
    name: "Ad Research Platform",
    category: "Ad Spy Tools",
    badge: "Good for angles",
    price: "Check site",
    rating: "4.6",
    headline: "Study winning ads before launching your own.",
    shortDescription:
      "A simple way to collect inspiration, compare hooks, and understand what kind of creative is getting attention.",
    why:
      "It gives you a clearer starting point before you spend budget on ads, especially when testing new products.",
    bestFor: "Facebook ads, TikTok ads, product research",
    watchOut:
      "Ad data is only a signal. You still need testing, good landing pages, and clear offers.",
    affiliateUrl: "https://example.com/ad-research-affiliate-link",
    websiteUrl: "",
    imageUrl: "",
    isFeatured: false,
    sortOrder: 2,
    status: "active",
    seoKeyword: "ad research platform for dropshipping",
  },
  {
    name: "Store Builder Platform",
    category: "Ecommerce Platforms",
    badge: "Best foundation",
    price: "Check plan",
    rating: "4.7",
    headline: "Build a clean store without heavy technical work.",
    shortDescription:
      "A store platform for launching products, managing pages, and connecting checkout tools in one place.",
    why:
      "A fast store setup helps you focus more on product, offer, and traffic instead of fighting with technical setup.",
    bestFor: "Online stores, dropshipping, brand testing",
    watchOut:
      "Monthly cost can grow when you add many apps. Start lean and only add what you really need.",
    affiliateUrl: "https://example.com/store-builder-affiliate-link",
    websiteUrl: "https://www.shopify.com/",
    imageUrl: "",
    isFeatured: false,
    sortOrder: 3,
    status: "active",
    seoKeyword: "best ecommerce platform for beginners",
  },
  {
    name: "Landing Page Builder",
    category: "Conversion Tools",
    badge: "Fast testing",
    price: "Check plan",
    rating: "4.5",
    headline: "Create focused pages for campaigns and offers.",
    shortDescription:
      "A builder for people who want cleaner sales pages, lead pages, and campaign pages without waiting on developers.",
    why:
      "Dedicated landing pages make it easier to match one traffic source with one clear message and one action.",
    bestFor: "Lead generation, paid ads, product launches",
    watchOut:
      "Templates help, but weak copy and unclear offers will still hurt conversion.",
    affiliateUrl: "https://example.com/landing-page-affiliate-link",
    websiteUrl: "",
    imageUrl: "",
    isFeatured: false,
    sortOrder: 4,
    status: "active",
    seoKeyword: "landing page builder for affiliate marketing",
  },
  {
    name: "Email Marketing Tool",
    category: "Marketing Automation",
    badge: "Audience builder",
    price: "Check plan",
    rating: "4.6",
    headline: "Turn visitors into repeat buyers and leads.",
    shortDescription:
      "An email platform for welcome flows, simple newsletters, follow-ups, and product education.",
    why:
      "Paid traffic is expensive. Email helps you keep contact with people who are not ready to buy today.",
    bestFor: "Creators, ecommerce stores, affiliate funnels",
    watchOut:
      "List quality matters more than list size. Avoid spammy sending and weak offers.",
    affiliateUrl: "https://example.com/email-tool-affiliate-link",
    websiteUrl: "",
    imageUrl: "",
    isFeatured: false,
    sortOrder: 5,
    status: "active",
    seoKeyword: "email marketing tool for affiliate funnels",
  },
  {
    name: "Creative Design Tool",
    category: "Creative Tools",
    badge: "Easy creatives",
    price: "Check plan",
    rating: "4.7",
    headline: "Make simple visuals for ads, stores, and content.",
    shortDescription:
      "A design tool for making product visuals, banners, social posts, and simple ad creatives without complex software.",
    why:
      "Good visuals help people understand your offer faster, especially when you test many angles.",
    bestFor: "Ad creatives, social content, store graphics",
    watchOut:
      "Templates can look generic. Add your own proof, offer, and brand style.",
    affiliateUrl: "https://example.com/design-tool-affiliate-link",
    websiteUrl: "",
    imageUrl: "",
    isFeatured: false,
    sortOrder: 6,
    status: "active",
    seoKeyword: "design tool for ad creatives",
  },
];

const faqs = [
  {
    q: "Are these tools only for advanced marketers?",
    a: "No. Most tools here are useful for beginners too, as long as you start with one clear goal: research, store setup, landing pages, email, or creative testing.",
  },
  {
    q: "Do you earn from these links?",
    a: "Some links are affiliate links. We may earn a small commission if you buy through them, at no extra cost to you.",
  },
  {
    q: "Can a tool guarantee sales?",
    a: "No tool can guarantee sales. Tools only help you research, build, test, and improve faster. Your offer, audience, traffic, and execution still matter.",
  },
  {
    q: "How should I choose the right platform?",
    a: "Start from the bottleneck. If you lack ideas, choose research tools. If your store is weak, fix your platform. If traffic is wasted, improve landing pages and email follow-up.",
  },
];

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .replace(/^\uFEFF/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeProduct(row, index) {
  const get = (key) => row[normalizeHeader(key)] || "";
  const status = String(get("status") || "active").toLowerCase();
  const websiteUrl = normalizeUrl(get("websiteUrl"));
  const affiliateUrl = normalizeUrl(get("affiliateUrl")) || websiteUrl || "#";
  const useWebsiteMetaValue = String(get("useWebsiteMeta") || "").toLowerCase();

  return {
    name: get("name") || `Tool ${index + 1}`,
    category: get("category") || "Business Tools",
    badge: get("badge") || "Worth checking",
    price: get("price") || "Check site",
    rating: get("rating") || "4.6",
    headline:
      get("headline") ||
      get("shortDescription") ||
      "A useful tool for online business.",
    shortDescription:
      get("shortDescription") ||
      "A simple platform that helps you work faster, compare better, and make clearer decisions.",
    why:
      get("why") ||
      "It solves a clear business problem and can save time when used for the right situation.",
    bestFor:
      get("bestFor") ||
      "Online business owners, marketers, and creators",
    watchOut:
      get("watchOut") ||
      "Check the latest pricing, plan limits, refund policy, and whether the tool fits your workflow before buying.",
    affiliateUrl,
    websiteUrl,
    imageUrl: get("imageUrl") || "",
    isFeatured: ["true", "yes", "1", "featured"].includes(
      String(get("isFeatured")).toLowerCase()
    ),
    sortOrder: Number(get("sortOrder")) || index + 1,
    status,
    seoKeyword: get("seoKeyword") || "best online business tools",
    useWebsiteMeta: !["false", "no", "0", "off"].includes(useWebsiteMetaValue),
  };
}

function parseCsv(text) {
  if (!text || typeof text !== "string") return [];

  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => String(value).trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => String(value).trim() !== "")) rows.push(row);

  const [headers, ...body] = rows;
  if (!headers || headers.length === 0) return [];

  const normalizedHeaders = headers.map(normalizeHeader);

  return body
    .map((values, index) => {
      const mapped = {};
      normalizedHeaders.forEach((header, headerIndex) => {
        mapped[header] = String(values[headerIndex] || "").trim();
      });
      return normalizeProduct(mapped, index);
    })
    .filter(
      (product) =>
        product.name &&
        product.status !== "draft" &&
        product.status !== "inactive"
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);
}


function normalizeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "#") return "";

  try {
    return new URL(raw).toString();
  } catch (_) {
    try {
      return new URL(`https://${raw}`).toString();
    } catch (_) {
      return "";
    }
  }
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value) {
  return decodeHtml(String(value || "").replace(/<[^>]*>/g, " "));
}

function pickMetaContent(html, names) {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regexes = [
      new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`, "i"),
    ];

    for (const regex of regexes) {
      const match = html.match(regex);
      if (match?.[1]) return decodeHtml(match[1]);
    }
  }

  return "";
}

function pickTitle(html) {
  const ogTitle = pickMetaContent(html, ["og:title", "twitter:title"]);
  if (ogTitle) return ogTitle;

  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? stripTags(match[1]) : "";
}

function resolveAssetUrl(assetUrl, pageUrl) {
  if (!assetUrl) return "";

  try {
    return new URL(assetUrl, pageUrl).toString();
  } catch (_) {
    return "";
  }
}

function trimText(value, maxLength = 220) {
  const clean = decodeHtml(value);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}…`;
}

async function fetchWebsiteMeta(product) {
  if (!product.websiteUrl) return {};

  const timeoutMs = Math.max(1200, Number(process.env.WEBSITE_META_TIMEOUT_MS || 3500));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(product.websiteUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": process.env.WEBSITE_META_USER_AGENT || "ToolStackPicksBot/1.0 (+https://yourdomain.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) return {};

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return {};

    const html = await response.text();
    const description = pickMetaContent(html, [
      "description",
      "og:description",
      "twitter:description",
    ]);
    const image = pickMetaContent(html, ["og:image", "twitter:image"]);

    return {
      title: trimText(pickTitle(html), 90),
      description: trimText(description, 240),
      imageUrl: resolveAssetUrl(image, product.websiteUrl),
      metaSource: product.websiteUrl,
    };
  } catch (_) {
    return {};
  } finally {
    clearTimeout(timeout);
  }
}

async function enrichProductsWithWebsiteMeta(products) {
  const shouldFetch = String(process.env.AUTO_FETCH_WEBSITE_META || "false").toLowerCase() === "true";
  if (!shouldFetch) return products;

  const limit = Math.max(1, Number(process.env.WEBSITE_META_LIMIT || 12));
  const itemsToFetch = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => product.websiteUrl && product.useWebsiteMeta)
    .slice(0, limit);

  const metaResults = await Promise.all(
    itemsToFetch.map(async ({ product, index }) => ({
      index,
      meta: await fetchWebsiteMeta(product),
    }))
  );

  const enriched = [...products];
  for (const { index, meta } of metaResults) {
    if (!meta || Object.keys(meta).length === 0) continue;
    const product = enriched[index];

    enriched[index] = {
      ...product,
      headline:
        product.headline && product.headline !== "A useful tool for online business."
          ? product.headline
          : meta.title || product.headline,
      shortDescription:
        product.shortDescription &&
        product.shortDescription !==
          "A simple platform that helps you work faster, compare better, and make clearer decisions."
          ? product.shortDescription
          : meta.description || product.shortDescription,
      imageUrl: product.imageUrl || meta.imageUrl || "",
      metaSource: meta.metaSource || product.websiteUrl,
    };
  }

  return enriched;
}

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 rating`}>
      ★★★★★ <strong>{rating}</strong>
    </span>
  );
}

function ProductCard({ product, index }) {
  return (
    <article className="product-card" id={`pick-${index + 1}`}>
      <div className="product-topline">
        <span className="badge">{product.badge}</span>
        <span className="category">{product.category}</span>
      </div>

      <div className={product.imageUrl ? "product-visual has-image" : "product-visual"}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={`${product.name} preview`}
            loading="lazy"
          />
        ) : (
          <span>{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>

      <div className="product-content">
        <div className="rating-row">
          <Stars rating={product.rating} />
          <span className="price">{product.price}</span>
        </div>

        <h3>{product.name}</h3>
        <p className="headline">{product.headline}</p>
        <p className="short-copy">{product.shortDescription}</p>

        <div className="reason-box">
          <strong>Why it is useful:</strong>
          <p>{product.why}</p>
        </div>

        <dl className="mini-details">
          <div>
            <dt>Best for</dt>
            <dd>{product.bestFor}</dd>
          </div>
          <div>
            <dt>Check first</dt>
            <dd>{product.watchOut}</dd>
          </div>
        </dl>

        <a
          className="buy-button"
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          aria-label={`Visit ${product.name}`}
        >
          Visit official site <span>→</span>
        </a>
      </div>
    </article>
  );
}

export default function AffiliateLandingPage({
  products = fallbackProducts,
  source = "fallback",
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const safeProducts = products.length > 0 ? products : fallbackProducts;
  const featuredProduct =
    safeProducts.find((product) => product.isFeatured) || safeProducts[0];

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(safeProducts.map((product) => product.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [safeProducts]);

  const filteredProducts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return safeProducts.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || product.category === activeCategory;
      const queryMatch =
        !cleanQuery ||
        [
          product.name,
          product.category,
          product.headline,
          product.shortDescription,
          product.bestFor,
          product.seoKeyword,
        ]
          .join(" ")
          .toLowerCase()
          .includes(cleanQuery);

      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query, safeProducts]);

  const keywords = Array.from(
    new Set(
      safeProducts
        .flatMap((product) => [product.category, product.seoKeyword])
        .filter(Boolean)
    )
  ).join(", ");

  const pageTitle = `${site.name} | Simple Reviews of Tools for Ecommerce, Ads, and Affiliate Marketing`;
  const pageDescription =
    "Simple and honest reviews of online business tools, ad spy platforms, ecommerce platforms, landing page builders, and marketing software.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    description: pageDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.domain}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recommended Business Tools",
    itemListElement: safeProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: product.affiliateUrl,
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={site.domain} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={site.domain} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />

        <header className="hero-section">
          <nav className="nav" aria-label="Main navigation">
            <a className="brand" href="#top" aria-label={`${site.name} home`}>
              <span className="brand-mark">{site.logoLetter}</span>
              <span>{site.name}</span>
            </a>
            <div className="nav-links">
              <a href="#picks">Tool Picks</a>
              <a href="#why">Why Trust Us</a>
              <a href="#faq">FAQ</a>
            </div>
          </nav>

          <section className="hero-grid" id="top">
            <div className="hero-copy">
              <p className="eyebrow">
                Tools for ecommerce, ads, and online growth
              </p>
              <h1>Choose better platforms before you spend your money.</h1>
              <p className="hero-text">
                We review useful tools in simple English, explain who each one
                is for, and point out what to check before you subscribe.
              </p>

              <div className="hero-actions">
                <a className="primary-cta" href="#picks">
                  See recommended tools
                </a>
                <a className="secondary-cta" href="#method">
                  How we choose
                </a>
              </div>

              <div className="trust-row" aria-label="Trust highlights">
                <span>Simple explanations</span>
                <span>Clear use cases</span>
                <span>No fake guarantees</span>
              </div>
            </div>

            <aside
              className="hero-card"
              aria-label="Featured recommendation summary"
            >
              <div className="hero-card-glow" />
              <p className="card-label">Featured tool</p>
              <h2>{featuredProduct.name}</h2>
              <Stars rating={featuredProduct.rating} />
              <p>{featuredProduct.shortDescription}</p>
              <div className="score-grid">
                <div>
                  <strong>Use case</strong>
                  <span>Clear</span>
                </div>
                <div>
                  <strong>Learning curve</strong>
                  <span>Manageable</span>
                </div>
                <div>
                  <strong>Decision fit</strong>
                  <span>Strong</span>
                </div>
              </div>
              <a
                className="card-link"
                href={featuredProduct.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
              >
                Check tool →
              </a>
              <p className="data-note">
                Database source:{" "}
                {source === "google-sheet" ? "Google Sheet" : "Fallback data"}
              </p>
            </aside>
          </section>
        </header>

        <section className="disclosure" aria-label="Affiliate disclosure">
          <strong>Affiliate note:</strong> Some links on this page may earn us a
          small commission at no extra cost to you. We aim to explain each tool
          clearly, but you should always check the latest price, plan limits,
          refund policy, and official details before buying.
        </section>

        <section className="section intro-section" id="why">
          <div>
            <p className="eyebrow">Why this page works for tool niches</p>
            <h2>People do not trust hype. They trust clear answers.</h2>
          </div>
          <div className="intro-grid">
            <article>
              <span>01</span>
              <h3>Problem first</h3>
              <p>
                Each tool is tied to a real business problem, not just a feature
                list.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Easy to compare</h3>
              <p>
                Visitors can compare category, use case, price note, and warning
                before clicking.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Better affiliate trust</h3>
              <p>
                The page explains limits and avoids promising income, which
                makes it feel more honest.
              </p>
            </article>
          </div>
        </section>

        <section className="section method-section" id="method">
          <div className="method-card">
            <p className="eyebrow">Our selection method</p>
            <h2>We use a simple filter before recommending a tool.</h2>
            <p>
              A platform should solve a clear problem, save meaningful time,
              support a practical workflow, and be understandable before someone
              pays for it. If a tool looks powerful but does not fit a clear use
              case, it should not be the first recommendation.
            </p>
          </div>
          <div className="method-list">
            <div>
              <strong>Research value</strong>
              <span>Does it help users make better decisions?</span>
            </div>
            <div>
              <strong>Ease of use</strong>
              <span>Can beginners understand the first steps?</span>
            </div>
            <div>
              <strong>Business fit</strong>
              <span>Who should use it, and who should skip it?</span>
            </div>
            <div>
              <strong>Risk check</strong>
              <span>Are pricing, limits, and expectations clear?</span>
            </div>
          </div>
        </section>

        <section className="section products-section" id="picks">
          <div className="section-heading">
            <p className="eyebrow">Recommended tools</p>
            <h2>Platforms worth checking before your next campaign.</h2>
            <p>
              Search or filter by category. The data comes from your Google
              Sheet, so you can update products without editing code.
            </p>
          </div>

          <div className="tool-filter" aria-label="Tool filters">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, categories, or use cases..."
              aria-label="Search recommended tools"
            />
            <div className="category-strip" aria-label="Tool categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={`${product.name}-${product.affiliateUrl}`}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No tools found.</h3>
              <p>Try a different keyword or choose another category.</p>
            </div>
          )}
        </section>

        <section
          className="section comparison-section"
          aria-label="Quick tool comparison"
        >
          <div className="section-heading compact">
            <p className="eyebrow">Quick comparison</p>
            <h2>Choose based on your current bottleneck.</h2>
          </div>

          <div
            className="comparison-table"
            role="table"
            aria-label="Tool comparison table"
          >
            <div className="table-row table-head" role="row">
              <span role="columnheader">Tool</span>
              <span role="columnheader">Best use</span>
              <span role="columnheader">Category</span>
              <span role="columnheader">Price</span>
            </div>
            {safeProducts.slice(0, 6).map((product) => (
              <div className="table-row" role="row" key={product.name}>
                <span role="cell">{product.name}</span>
                <span role="cell">{product.bestFor}</span>
                <span role="cell">{product.category}</span>
                <span role="cell">{product.price}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section newsletter-section">
          <div>
            <p className="eyebrow">Better tool decisions</p>
            <h2>Do not buy tools randomly.</h2>
            <p>
              Pick one bottleneck first. Research tool, store platform, page
              builder, email tool, or creative tool. Then choose the platform
              that solves that exact bottleneck.
            </p>
          </div>
          <a className="primary-cta" href="#picks">
            Browse tools again
          </a>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-heading compact">
            <p className="eyebrow">FAQ</p>
            <h2>Questions people ask before buying tools.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div>
            <a className="brand footer-brand" href="#top">
              <span className="brand-mark">{site.logoLetter}</span>
              <span>{site.name}</span>
            </a>
            <p>{site.tagline}</p>
          </div>
          <div className="footer-links">
            <a href="#picks">Tool Picks</a>
            <a href="#why">Why Trust Us</a>
            <a href={`mailto:${site.email}`}>Contact</a>
          </div>
        </footer>

        <style>{`
          :root {
            --bg: #070d16;
            --card: rgba(255, 255, 255, 0.075);
            --card-strong: rgba(255, 255, 255, 0.11);
            --text: #eef7ff;
            --muted: #a8bbc9;
            --line: rgba(255, 255, 255, 0.14);
            --gold: #f6c96f;
            --mint: #68f0c5;
            --blue: #85b7ff;
            --purple: #b69cff;
            --shadow: 0 30px 100px rgba(0, 0, 0, 0.35);
            --radius: 26px;
          }

          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            margin: 0;
            background:
              radial-gradient(circle at top left, rgba(104, 240, 197, 0.18), transparent 34rem),
              radial-gradient(circle at top right, rgba(182, 156, 255, 0.2), transparent 34rem),
              linear-gradient(180deg, #070d16 0%, #08131d 45%, #0b1118 100%);
            color: var(--text);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1.6;
          }

          a { color: inherit; text-decoration: none; }
          button, input { font: inherit; }
          main { min-height: 100vh; overflow: hidden; }

          .hero-section, .section, .footer, .disclosure {
            width: min(1160px, calc(100% - 32px));
            margin-inline: auto;
          }

          .hero-section { padding: 22px 0 40px; }

          .nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 14px;
            border: 1px solid var(--line);
            border-radius: 999px;
            background: rgba(7, 13, 22, 0.72);
            backdrop-filter: blur(18px);
            position: sticky;
            top: 16px;
            z-index: 10;
          }

          .brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-weight: 850;
            letter-spacing: -0.03em;
          }

          .brand-mark {
            width: 38px;
            height: 38px;
            display: grid;
            place-items: center;
            border-radius: 14px;
            background: linear-gradient(135deg, var(--mint), var(--blue));
            color: #071018;
            box-shadow: 0 12px 30px rgba(104, 240, 197, 0.22);
          }

          .nav-links { display: flex; align-items: center; gap: 4px; }
          .nav-links a {
            color: var(--muted);
            padding: 10px 14px;
            border-radius: 999px;
            font-size: 0.94rem;
            transition: 180ms ease;
          }
          .nav-links a:hover {
            color: var(--text);
            background: rgba(255, 255, 255, 0.08);
          }

          .hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.72fr);
            gap: 28px;
            align-items: center;
            padding: 86px 0 42px;
          }

          .eyebrow {
            margin: 0 0 12px;
            color: var(--mint);
            font-weight: 850;
            font-size: 0.78rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          h1, h2, h3, p { margin-top: 0; }
          h1 {
            max-width: 860px;
            margin-bottom: 22px;
            font-size: clamp(3rem, 7vw, 6.7rem);
            line-height: 0.92;
            letter-spacing: -0.08em;
          }
          h2 {
            margin-bottom: 16px;
            font-size: clamp(2rem, 4vw, 4rem);
            line-height: 1;
            letter-spacing: -0.065em;
          }
          h3 {
            margin-bottom: 10px;
            font-size: 1.3rem;
            line-height: 1.1;
            letter-spacing: -0.04em;
          }

          .hero-text {
            max-width: 650px;
            color: var(--muted);
            font-size: clamp(1.05rem, 2vw, 1.24rem);
          }

          .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 30px 0;
          }

          .primary-cta, .secondary-cta, .buy-button, .card-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border-radius: 999px;
            font-weight: 850;
            transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
          }

          .primary-cta {
            min-height: 52px;
            padding: 0 22px;
            background: linear-gradient(135deg, var(--mint), var(--blue));
            color: #071018;
            box-shadow: 0 18px 45px rgba(104, 240, 197, 0.18);
          }

          .secondary-cta {
            min-height: 52px;
            padding: 0 22px;
            color: var(--text);
            border: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.06);
          }

          .primary-cta:hover, .secondary-cta:hover, .buy-button:hover, .card-link:hover {
            transform: translateY(-2px);
          }

          .trust-row, .category-strip {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .trust-row span, .badge, .category, .category-strip button {
            border: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.055);
            color: var(--muted);
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 0.88rem;
          }

          .hero-card {
            position: relative;
            padding: 28px;
            border: 1px solid var(--line);
            border-radius: 34px;
            background:
              linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045)),
              rgba(255,255,255,0.04);
            box-shadow: var(--shadow);
            overflow: hidden;
          }

          .hero-card-glow {
            position: absolute;
            inset: -120px -120px auto auto;
            width: 260px;
            height: 260px;
            border-radius: 999px;
            background: rgba(104, 240, 197, 0.25);
            filter: blur(20px);
          }

          .card-label { color: var(--gold); font-weight: 850; }
          .stars {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--gold);
            font-size: 0.95rem;
          }
          .stars strong { color: var(--text); }
          .hero-card p:not(.card-label) { color: var(--muted); }

          .score-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 24px 0;
          }
          .score-grid div {
            padding: 14px;
            border: 1px solid var(--line);
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.06);
          }
          .score-grid strong, .score-grid span { display: block; }
          .score-grid strong { font-size: 0.82rem; color: var(--muted); }
          .score-grid span { margin-top: 5px; font-weight: 900; }
          .card-link {
            width: 100%;
            min-height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid var(--line);
          }
          .data-note {
            margin: 14px 0 0;
            font-size: 0.82rem;
            text-align: center;
          }

          .disclosure {
            padding: 18px 20px;
            border: 1px solid rgba(246, 201, 111, 0.35);
            border-radius: 22px;
            background: rgba(246, 201, 111, 0.08);
            color: #ffe8b4;
          }

          .section { padding: 82px 0; }

          .intro-section {
            display: grid;
            grid-template-columns: 0.9fr 1.1fr;
            gap: 28px;
            align-items: start;
          }
          .intro-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .intro-grid article, .method-card, .method-list div, .product-card,
          .comparison-table, .newsletter-section, details, .empty-state {
            border: 1px solid var(--line);
            background: var(--card);
            box-shadow: 0 20px 70px rgba(0,0,0,0.18);
            backdrop-filter: blur(18px);
          }
          .intro-grid article {
            padding: 20px;
            border-radius: 24px;
          }
          .intro-grid span {
            display: inline-block;
            margin-bottom: 26px;
            color: var(--mint);
            font-weight: 900;
          }
          .intro-grid p, .section-heading p, .method-card p,
          .newsletter-section p, .faq-list p, .empty-state p {
            color: var(--muted);
          }

          .method-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            align-items: stretch;
          }
          .method-card {
            padding: 34px;
            border-radius: var(--radius);
          }
          .method-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .method-list div {
            padding: 24px;
            border-radius: var(--radius);
          }
          .method-list strong, .method-list span { display: block; }
          .method-list strong {
            margin-bottom: 8px;
            font-size: 1.2rem;
          }
          .method-list span { color: var(--muted); }

          .section-heading {
            max-width: 760px;
            margin-bottom: 30px;
          }
          .section-heading.compact { max-width: 650px; }

          .tool-filter { margin-bottom: 28px; }
          .tool-filter input {
            width: 100%;
            min-height: 56px;
            padding: 0 18px;
            color: var(--text);
            outline: none;
            border: 1px solid var(--line);
            border-radius: 18px;
            background: rgba(255,255,255,0.065);
          }
          .tool-filter input:focus {
            border-color: rgba(104, 240, 197, 0.48);
            box-shadow: 0 0 0 4px rgba(104, 240, 197, 0.08);
          }
          .category-strip { padding-top: 14px; }
          .category-strip button { cursor: pointer; }
          .category-strip button.active, .category-strip button:hover {
            color: #071018;
            background: var(--mint);
            border-color: transparent;
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }
          .product-card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 100%;
            border-radius: 30px;
            overflow: hidden;
            transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
          }
          .product-card:hover {
            transform: translateY(-6px);
            border-color: rgba(104, 240, 197, 0.35);
            background: var(--card-strong);
          }
          .product-topline {
            position: absolute;
            inset: 16px 16px auto 16px;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            gap: 10px;
            pointer-events: none;
          }
          .badge {
            color: #081118;
            background: var(--gold);
            border-color: transparent;
            font-weight: 900;
          }
          .category {
            color: var(--text);
            background: rgba(7, 16, 24, 0.5);
          }
          .product-visual {
            min-height: 210px;
            display: flex;
            align-items: end;
            padding: 22px;
            background:
              radial-gradient(circle at 20% 20%, rgba(104,240,197,0.28), transparent 18rem),
              radial-gradient(circle at 80% 20%, rgba(182,156,255,0.3), transparent 18rem),
              linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035));
          }
          .product-visual span {
            font-size: 4.8rem;
            line-height: 1;
            font-weight: 950;
            letter-spacing: -0.09em;
            color: rgba(255,255,255,0.22);
          }
          .product-visual.has-image {
            padding: 0;
            align-items: stretch;
            background: rgba(255,255,255,0.06);
          }
          .product-visual img {
            width: 100%;
            height: 230px;
            object-fit: cover;
            display: block;
          }
          .product-content {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 22px;
          }
          .rating-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 16px;
          }
          .price {
            color: var(--mint);
            font-weight: 900;
          }
          .headline {
            color: var(--text);
            font-weight: 750;
            margin-bottom: 8px;
          }
          .short-copy {
            color: var(--muted);
            margin-bottom: 18px;
          }
          .reason-box {
            padding: 14px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.055);
            border: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 18px;
          }
          .reason-box p {
            margin: 5px 0 0;
            color: var(--muted);
          }
          .mini-details {
            display: grid;
            gap: 10px;
            margin: 0 0 20px;
          }
          .mini-details div {
            display: grid;
            grid-template-columns: 88px 1fr;
            gap: 10px;
          }
          .mini-details dt {
            color: var(--muted);
            font-size: 0.86rem;
          }
          .mini-details dd { margin: 0; }
          .buy-button {
            min-height: 52px;
            margin-top: auto;
            background: linear-gradient(135deg, var(--mint), var(--blue));
            color: #071018;
          }
          .empty-state {
            border-radius: 24px;
            padding: 28px;
          }

          .comparison-table {
            overflow: hidden;
            border-radius: var(--radius);
          }
          .table-row {
            display: grid;
            grid-template-columns: 1.1fr 1.3fr 1fr 0.55fr;
            gap: 16px;
            padding: 18px 20px;
            border-top: 1px solid var(--line);
            color: var(--muted);
          }
          .table-row:first-child { border-top: 0; }
          .table-head {
            color: var(--text);
            font-weight: 900;
            background: rgba(255,255,255,0.075);
          }
          .table-row span:first-child {
            color: var(--text);
            font-weight: 800;
          }

          .newsletter-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 34px;
            border-radius: 34px;
            background:
              radial-gradient(circle at left, rgba(104,240,197,0.16), transparent 26rem),
              var(--card);
          }
          .newsletter-section h2 {
            font-size: clamp(2rem, 4vw, 3.3rem);
          }
          .faq-list {
            display: grid;
            gap: 12px;
          }
          details {
            padding: 18px 20px;
            border-radius: 20px;
          }
          summary {
            cursor: pointer;
            font-weight: 900;
          }
          summary::marker { color: var(--mint); }
          details p { margin: 12px 0 0; }

          .footer {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            padding: 46px 0 56px;
            color: var(--muted);
          }
          .footer-brand {
            color: var(--text);
            margin-bottom: 10px;
          }
          .footer p { margin-bottom: 0; }
          .footer-links {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
          }
          .footer-links a { color: var(--muted); }
          .footer-links a:hover { color: var(--text); }

          @media (max-width: 980px) {
            .hero-grid, .intro-section, .method-section {
              grid-template-columns: 1fr;
            }
            .product-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 720px) {
            .hero-section, .section, .footer, .disclosure {
              width: min(100% - 22px, 1160px);
            }
            .nav {
              align-items: flex-start;
              border-radius: 24px;
            }
            .nav-links { display: none; }
            .hero-grid { padding-top: 52px; }
            h1 { font-size: clamp(3rem, 16vw, 4.6rem); }
            .hero-actions, .trust-row, .newsletter-section, .footer {
              flex-direction: column;
              align-items: stretch;
            }
            .primary-cta, .secondary-cta { width: 100%; }
            .score-grid, .intro-grid, .method-list, .product-grid {
              grid-template-columns: 1fr;
            }
            .table-row {
              grid-template-columns: 1fr;
              gap: 4px;
              padding: 18px;
            }
            .table-head { display: none; }
            .product-topline {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}</style>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const csvUrl = process.env.GOOGLE_SHEET_CSV_URL;
  const refreshSeconds = Math.max(
    60,
    Number(process.env.SHEET_REFRESH_SECONDS || 900)
  );

  if (!csvUrl) {
    return {
      props: {
        products: fallbackProducts,
        source: "fallback",
      },
      revalidate: refreshSeconds,
    };
  }

  try {
    const response = await fetch(csvUrl, {
      headers: {
        "User-Agent": "ToolStack-Picks/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Google Sheet CSV fetch failed: ${response.status}`);
    }

    const csvText = await response.text();
    const sheetProducts = parseCsv(csvText);
    const productsFromSheet = sheetProducts.length > 0 ? sheetProducts : fallbackProducts;
    const enrichedProducts = await enrichProductsWithWebsiteMeta(productsFromSheet);

    return {
      props: {
        products: enrichedProducts,
        source: sheetProducts.length > 0 ? "google-sheet" : "fallback",
      },
      revalidate: refreshSeconds,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: fallbackProducts,
        source: "fallback",
      },
      revalidate: refreshSeconds,
    };
  }
}
