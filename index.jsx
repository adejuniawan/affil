// app/page.jsx
// One-file affiliate website for Next.js + Vercel.
// Replace the links, product names, prices, and domain below before publishing.

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "Smart Picks Hub | Honest Finds for Better Everyday Buying",
  description:
    "Simple, honest product picks for people who want useful gear, fair value, and less buying stress.",
  keywords: [
    "best product picks",
    "honest product reviews",
    "affiliate product recommendations",
    "smart buying guide",
    "useful everyday products",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Smart Picks Hub | Honest Finds for Better Everyday Buying",
    description:
      "Clear, simple product recommendations made to help you buy with confidence.",
    url: "https://yourdomain.com",
    siteName: "Smart Picks Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Picks Hub | Honest Finds for Better Everyday Buying",
    description:
      "Simple product picks with clear reasons, quick comparisons, and honest notes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const site = {
  name: "Smart Picks Hub",
  tagline: "Honest finds. Clear reasons. Better buying decisions.",
  domain: "https://yourdomain.com",
  email: "hello@yourdomain.com",
};

const categories = [
  "Work From Home",
  "Travel Gear",
  "Daily Tech",
  "Home Comfort",
];

const products = [
  {
    name: "FocusFlow Desk Lamp",
    category: "Work From Home",
    badge: "Best for deep work",
    price: "$49",
    rating: "4.8",
    short:
      "A clean desk lamp for people who work late, read often, or want a calmer setup.",
    why:
      "It gives soft light, saves desk space, and looks good without feeling too expensive.",
    bestFor: "Home office, students, night readers",
    watchOut: "Not ideal if you need a very bright studio light.",
    affiliateUrl: "https://example.com/affiliate-desk-lamp",
  },
  {
    name: "PackLite Travel Organizer",
    category: "Travel Gear",
    badge: "Most practical",
    price: "$29",
    rating: "4.7",
    short:
      "A simple organizer that keeps chargers, cables, passport items, and small tools in one place.",
    why:
      "It reduces bag mess and makes airport checks, hotel stays, and short trips easier.",
    bestFor: "Frequent travelers, digital nomads, weekend trips",
    watchOut: "May feel small if you carry many large accessories.",
    affiliateUrl: "https://example.com/affiliate-travel-organizer",
  },
  {
    name: "ClearSound Mini Earbuds",
    category: "Daily Tech",
    badge: "Great value",
    price: "$39",
    rating: "4.6",
    short:
      "Light earbuds for calls, music, and everyday listening without paying premium prices.",
    why:
      "They are easy to carry, simple to pair, and good enough for most daily use.",
    bestFor: "Commute, casual music, online meetings",
    watchOut: "Not made for professional audio editing.",
    affiliateUrl: "https://example.com/affiliate-earbuds",
  },
  {
    name: "CozyNest Memory Pillow",
    category: "Home Comfort",
    badge: "Comfort pick",
    price: "$59",
    rating: "4.8",
    short:
      "A supportive pillow for people who wake up with neck tension or want better sleep comfort.",
    why:
      "It balances softness and support, which makes it easy to use for many sleeping styles.",
    bestFor: "Side sleepers, back sleepers, better rest",
    watchOut: "Memory foam can feel firm during the first few nights.",
    affiliateUrl: "https://example.com/affiliate-memory-pillow",
  },
  {
    name: "ChargeMate 3-in-1 Station",
    category: "Daily Tech",
    badge: "Clean setup",
    price: "$45",
    rating: "4.7",
    short:
      "A compact charging station that helps keep your phone, watch, and earbuds ready.",
    why:
      "It removes cable clutter and makes your nightstand or desk feel more organized.",
    bestFor: "Apple users, small desks, bedside charging",
    watchOut: "Check device compatibility before buying.",
    affiliateUrl: "https://example.com/affiliate-charging-station",
  },
  {
    name: "BrewEase Compact Coffee Maker",
    category: "Home Comfort",
    badge: "Morning favorite",
    price: "$69",
    rating: "4.5",
    short:
      "A small coffee maker for quick mornings, small kitchens, dorm rooms, or office corners.",
    why:
      "It is simple to use, easy to clean, and does not take over your counter space.",
    bestFor: "Small homes, office desks, quick coffee",
    watchOut: "Not the right pick for large family servings.",
    affiliateUrl: "https://example.com/affiliate-coffee-maker",
  },
];

const faqs = [
  {
    q: "Are these real recommendations?",
    a: "Yes. Each pick is written to help real people understand who the product is for, why it may help, and what to check before buying.",
  },
  {
    q: "Do you earn money from these links?",
    a: "Some links are affiliate links. That means we may earn a small commission if you buy through them, at no extra cost to you.",
  },
  {
    q: "How do you choose products?",
    a: "We look for products that solve clear problems, offer fair value, have practical use cases, and are easy to understand before purchase.",
  },
  {
    q: "Should I buy the top pick immediately?",
    a: "Only if it fits your need, budget, and situation. A good product is only good when it solves your actual problem.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.domain,
  description:
    "Simple and honest affiliate product recommendations for everyday buyers.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.domain}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Recommended Product Picks",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: product.affiliateUrl,
  })),
};

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

      <div className="product-visual" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="product-content">
        <div className="rating-row">
          <Stars rating={product.rating} />
          <span className="price">From {product.price}</span>
        </div>

        <h3>{product.name}</h3>
        <p className="short-copy">{product.short}</p>

        <div className="reason-box">
          <strong>Why people like it:</strong>
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
          aria-label={`Check price for ${product.name}`}
        >
          Check today&apos;s price
          <span>→</span>
        </a>
      </div>
    </article>
  );
}

export default function AffiliateLandingPage() {
  return (
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
            <span className="brand-mark">S</span>
            <span>{site.name}</span>
          </a>
          <div className="nav-links">
            <a href="#picks">Top Picks</a>
            <a href="#why">Why Trust Us</a>
            <a href="#faq">FAQ</a>
          </div>
        </nav>

        <section className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Simple buying guides for busy people</p>
            <h1>Find useful products without wasting hours comparing everything.</h1>
            <p className="hero-text">
              We collect practical, easy-to-understand product picks for people
              who want better value, fewer regrets, and clear reasons before
              they buy.
            </p>

            <div className="hero-actions">
              <a className="primary-cta" href="#picks">
                See recommended picks
              </a>
              <a className="secondary-cta" href="#method">
                How we choose
              </a>
            </div>

            <div className="trust-row" aria-label="Trust highlights">
              <span>Clear pros and cons</span>
              <span>No confusing jargon</span>
              <span>Affiliate disclosure included</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Featured recommendation summary">
            <div className="hero-card-glow" />
            <p className="card-label">Today&apos;s helpful pick</p>
            <h2>{products[0].name}</h2>
            <Stars rating={products[0].rating} />
            <p>{products[0].short}</p>
            <div className="score-grid">
              <div>
                <strong>Easy use</strong>
                <span>9.2/10</span>
              </div>
              <div>
                <strong>Value</strong>
                <span>8.9/10</span>
              </div>
              <div>
                <strong>Design</strong>
                <span>9.0/10</span>
              </div>
            </div>
            <a
              className="card-link"
              href={products[0].affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
            >
              View deal →
            </a>
          </aside>
        </section>
      </header>

      <section className="disclosure" aria-label="Affiliate disclosure">
        <strong>Affiliate note:</strong> Some links on this page may earn us a
        small commission at no extra cost to you. We only recommend products
        that fit a clear use case, and you should always check the latest price,
        warranty, and seller details before buying.
      </section>

      <section className="category-strip" aria-label="Popular categories">
        {categories.map((category) => (
          <a key={category} href="#picks">
            {category}
          </a>
        ))}
      </section>

      <section className="section intro-section" id="why">
        <div>
          <p className="eyebrow">Why this page feels different</p>
          <h2>Simple words. Clear reasons. No pressure.</h2>
        </div>
        <div className="intro-grid">
          <article>
            <span>01</span>
            <h3>Made for real needs</h3>
            <p>
              Every product is connected to a clear problem, not just a shiny
              feature list.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Easy to compare</h3>
            <p>
              You can see who each item is for, what makes it useful, and what
              to check first.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Trust before clicks</h3>
            <p>
              We use honest language, visible disclosure, and practical buying
              notes to reduce doubt.
            </p>
          </article>
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="method-card">
          <p className="eyebrow">Our selection method</p>
          <h2>We choose products with a simple buying filter.</h2>
          <p>
            A product should solve a real problem, be easy to use, offer fair
            value, and have a clear reason to exist. If an item looks cool but
            does not make daily life easier, it does not belong here.
          </p>
        </div>
        <div className="method-list">
          <div>
            <strong>Usefulness</strong>
            <span>Does it make life easier?</span>
          </div>
          <div>
            <strong>Value</strong>
            <span>Is the benefit fair for the price?</span>
          </div>
          <div>
            <strong>Ease</strong>
            <span>Can most people use it without stress?</span>
          </div>
          <div>
            <strong>Fit</strong>
            <span>Who should buy it, and who should skip it?</span>
          </div>
        </div>
      </section>

      <section className="section products-section" id="picks">
        <div className="section-heading">
          <p className="eyebrow">Recommended picks</p>
          <h2>Useful products worth checking today.</h2>
          <p>
            Start with your actual need. Then compare the notes, price range,
            and “check first” section before clicking any deal.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="section comparison-section" aria-label="Quick product comparison">
        <div className="section-heading compact">
          <p className="eyebrow">Quick comparison</p>
          <h2>Choose based on your main goal.</h2>
        </div>

        <div className="comparison-table" role="table" aria-label="Product comparison table">
          <div className="table-row table-head" role="row">
            <span role="columnheader">Product</span>
            <span role="columnheader">Best use</span>
            <span role="columnheader">Main benefit</span>
            <span role="columnheader">Price</span>
          </div>
          {products.slice(0, 4).map((product) => (
            <div className="table-row" role="row" key={product.name}>
              <span role="cell">{product.name}</span>
              <span role="cell">{product.bestFor}</span>
              <span role="cell">{product.badge}</span>
              <span role="cell">{product.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section newsletter-section">
        <div>
          <p className="eyebrow">Better picks, less noise</p>
          <h2>Want cleaner buying decisions?</h2>
          <p>
            Bookmark this page and come back when you need a simple, calm place
            to compare useful products.
          </p>
        </div>
        <a className="primary-cta" href="#picks">
          Browse picks again
        </a>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading compact">
          <p className="eyebrow">FAQ</p>
          <h2>Questions people ask before buying.</h2>
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
            <span className="brand-mark">S</span>
            <span>{site.name}</span>
          </a>
          <p>{site.tagline}</p>
        </div>
        <div className="footer-links">
          <a href="#picks">Top Picks</a>
          <a href="#why">Why Trust Us</a>
          <a href={`mailto:${site.email}`}>Contact</a>
        </div>
      </footer>

      <style>{`
        :root {
          --bg: #071018;
          --bg-soft: #0d1c28;
          --card: rgba(255, 255, 255, 0.075);
          --card-strong: rgba(255, 255, 255, 0.11);
          --text: #eef7ff;
          --muted: #a8bbc9;
          --line: rgba(255, 255, 255, 0.14);
          --gold: #f6c96f;
          --mint: #68f0c5;
          --blue: #85b7ff;
          --shadow: 0 30px 100px rgba(0, 0, 0, 0.35);
          --radius: 26px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(104, 240, 197, 0.18), transparent 34rem),
            radial-gradient(circle at top right, rgba(133, 183, 255, 0.2), transparent 34rem),
            linear-gradient(180deg, #071018 0%, #08131d 45%, #0b1118 100%);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          line-height: 1.6;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        main {
          min-height: 100vh;
          overflow: hidden;
        }

        .hero-section,
        .section,
        .footer,
        .disclosure,
        .category-strip {
          width: min(1160px, calc(100% - 32px));
          margin-inline: auto;
        }

        .hero-section {
          padding: 22px 0 40px;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 14px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(7, 16, 24, 0.72);
          backdrop-filter: blur(18px);
          position: sticky;
          top: 16px;
          z-index: 10;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
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

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

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
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 820px;
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

        .primary-cta,
        .secondary-cta,
        .buy-button,
        .card-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 999px;
          font-weight: 800;
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

        .primary-cta:hover,
        .secondary-cta:hover,
        .buy-button:hover,
        .card-link:hover {
          transform: translateY(-2px);
        }

        .trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .trust-row span,
        .category-strip a,
        .badge,
        .category {
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
            linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.045)),
            rgba(255, 255, 255, 0.04);
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

        .card-label {
          color: var(--gold);
          font-weight: 800;
        }

        .stars {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--gold);
          font-size: 0.95rem;
        }

        .stars strong {
          color: var(--text);
        }

        .hero-card p:not(.card-label) {
          color: var(--muted);
        }

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

        .score-grid strong,
        .score-grid span {
          display: block;
        }

        .score-grid strong {
          font-size: 0.82rem;
          color: var(--muted);
        }

        .score-grid span {
          margin-top: 5px;
          font-weight: 900;
        }

        .card-link {
          width: 100%;
          min-height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--line);
        }

        .disclosure {
          padding: 18px 20px;
          border: 1px solid rgba(246, 201, 111, 0.35);
          border-radius: 22px;
          background: rgba(246, 201, 111, 0.08);
          color: #ffe8b4;
        }

        .category-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 0 8px;
        }

        .category-strip a {
          padding: 11px 16px;
          color: var(--text);
        }

        .section {
          padding: 82px 0;
        }

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

        .intro-grid article,
        .method-card,
        .method-list div,
        .product-card,
        .comparison-table,
        .newsletter-section,
        details {
          border: 1px solid var(--line);
          background: var(--card);
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.18);
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

        .intro-grid p,
        .section-heading p,
        .method-card p,
        .newsletter-section p,
        .faq-list p {
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

        .method-list strong,
        .method-list span {
          display: block;
        }

        .method-list strong {
          margin-bottom: 8px;
          font-size: 1.2rem;
        }

        .method-list span {
          color: var(--muted);
        }

        .section-heading {
          max-width: 760px;
          margin-bottom: 30px;
        }

        .section-heading.compact {
          max-width: 650px;
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
            radial-gradient(circle at 20% 20%, rgba(104, 240, 197, 0.28), transparent 18rem),
            radial-gradient(circle at 80% 20%, rgba(133, 183, 255, 0.3), transparent 18rem),
            linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035));
        }

        .product-visual span {
          font-size: 4.8rem;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.09em;
          color: rgba(255, 255, 255, 0.22);
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

        .short-copy {
          color: var(--muted);
          margin-bottom: 18px;
        }

        .reason-box {
          padding: 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.1);
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

        .mini-details dd {
          margin: 0;
        }

        .buy-button {
          min-height: 52px;
          margin-top: auto;
          background: linear-gradient(135deg, var(--mint), var(--blue));
          color: #071018;
        }

        .comparison-table {
          overflow: hidden;
          border-radius: var(--radius);
        }

        .table-row {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr 1fr 0.45fr;
          gap: 16px;
          padding: 18px 20px;
          border-top: 1px solid var(--line);
          color: var(--muted);
        }

        .table-row:first-child {
          border-top: 0;
        }

        .table-head {
          color: var(--text);
          font-weight: 900;
          background: rgba(255, 255, 255, 0.075);
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
            radial-gradient(circle at left, rgba(104, 240, 197, 0.16), transparent 26rem),
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

        summary::marker {
          color: var(--mint);
        }

        details p {
          margin: 12px 0 0;
        }

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

        .footer p {
          margin-bottom: 0;
        }

        .footer-links {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: var(--muted);
        }

        .footer-links a:hover {
          color: var(--text);
        }

        @media (max-width: 980px) {
          .hero-grid,
          .intro-section,
          .method-section {
            grid-template-columns: 1fr;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .hero-section,
          .section,
          .footer,
          .disclosure,
          .category-strip {
            width: min(100% - 22px, 1160px);
          }

          .nav {
            align-items: flex-start;
            border-radius: 24px;
          }

          .nav-links {
            display: none;
          }

          .hero-grid {
            padding-top: 52px;
          }

          h1 {
            font-size: clamp(3rem, 16vw, 4.6rem);
          }

          .hero-actions,
          .trust-row,
          .category-strip,
          .newsletter-section,
          .footer {
            flex-direction: column;
            align-items: stretch;
          }

          .primary-cta,
          .secondary-cta {
            width: 100%;
          }

          .score-grid,
          .intro-grid,
          .method-list,
          .product-grid {
            grid-template-columns: 1fr;
          }

          .table-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .table-head {
            display: none;
          }

          .table-row {
            padding: 18px;
          }

          .product-topline {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
