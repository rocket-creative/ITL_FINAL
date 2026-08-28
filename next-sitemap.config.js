/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.genetargeting.com',
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false, // We don't need sitemap index for this size
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/og-preview/*',
    '/pricing-guide',
    '/pricing-guide/*',
    '/server-sitemap.xml', // Exclude if using dynamic sitemap
    '/*/thank-you', // noindex confirmation pages
  ],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for important pages
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Main service pages
    else if (path.match(/^\/(mouse-model-services|knockout-mouse-models|knockin-mouse-models|humanized-mouse-models|request-quote|contact)$/)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Breeding and cohort cluster
    else if (path.match(/^\/(mouse-breeding-services|mouse-cohort-development)$/)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    else if (path.match(/^\/(conditional-knockout-cohort-breeding|in-house-vs-outsourced-mouse-breeding)$/)) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    else if (path === '/cohort-consultation') {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Catalog and models (high value)
    else if (path.match(/^\/(catalog-mouse-models|all-catalog-mouse-models|.*-mouse-models)$/)) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Resources and guides
    else if (path.match(/^\/(resources|.*-guide|faq|technologies)$/)) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Everything else
    else {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
