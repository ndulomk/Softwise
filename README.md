Softwise Architecture: High-Performance SEO with Vite & Fastify

Author: Edgar Manuel Janota

Date: 2025

Version: 1.0.0

1. Executive Summary

At Softwise, we prioritize performance, scalability, and developer experience. While the industry standard often defaults to Next.js for SEO-friendly React applications, we identified that for our specific use case—a high-performance brutalist agency portfolio—a full-blown SSR (Server-Side Rendering) framework introduced unnecessary complexity and infrastructure overhead.

Instead, we architected a "Monolithic Modular" solution using Vite for a lightning-fast frontend development experience and Fastify as a robust backend. We achieved perfect SEO and Open Graph (social sharing) capabilities through a technique we call Dynamic Stream Injection, effectively bypassing the need for Next.js while maintaining 100% Google indexability.

2. The Challenge: SPA & SEO

Single Page Applications (SPAs) built with React and Vite are traditionally invisible to web crawlers. When a bot (like Googlebot or Facebook Crawler) accesses a standard SPA, it sees this:

<!-- What bots usually see -->
<div id="root"></div>
<script type="module" src="/assets/index.js"></script>


Because the content is rendered via JavaScript on the client side, the initial HTML is empty. This results in:

Poor SEO Ranking: Search engines cannot read titles, descriptions, or content.

Broken Social Cards: Sharing a link on WhatsApp or LinkedIn displays a generic title instead of the specific project details.

The Standard Solution vs. Our Approach

Standard Solution (Next.js): Render the entire React tree on the server. This requires a Node.js runtime to execute React logic for every request, consuming significant CPU and memory.

Our Approach (Stream Injection): We serve the static HTML shell but intercept the data stream before it leaves the server. We inject metadata directly into the HTML string using Node.js Streams. This is strictly I/O bound, making it incredibly fast and lightweight.

3. Architecture Overview

Our stack is designed for raw speed and simplicity.

3.1 Tech Stack

Frontend: React 19, TypeScript, Tailwind CSS, Framer Motion (Brutalist UI).

Build Tool: Vite (for O(1) HMR and optimized production builds).

Backend: Fastify (running on Node.js/Bun).

Data Layer: JSON File System (Simulating a high-speed NoSQL document store).

Communication: REST API + React Query (TanStack).

3.2 The Deployment Flow

We utilize a unified deployment strategy:

Build: The frontend is compiled (bun run build).

Sync: The resulting dist/ artifacts are moved to the backend's public/ directory.

Serve: Fastify acts as both the API server and the static file server.

4. The Core Innovation: SEO Stream Injection

This is the engine that drives our SEO strategy. Instead of rendering React components on the server, we treat the index.html file as a template stream.

How it Works (The Request Lifecycle)

When a user or bot requests https://softwise.ao/project/kambas-pay:

Route Interception: Fastify detects a request that is not an API call or static asset.

Data Fetching: The backend looks up "kambas-pay" in our data layer to retrieve the title, description, and image URL.

Stream Creation: We create a ReadStream for the physical index.html file.

Transformation (The Magic): We pipe this stream through our custom SeoInjectorStream class.

Injection: As the HTML chunks pass through the stream, we use regex to find <title> and <head> tags and inject the real metadata in real-time.

Response: The client receives a fully populated HTML file.

Implementation Snippet (SeoInjectorStream)

export class SeoInjectorStream extends Transform {
  override _flush(callback: TransformCallback): void {
    let finalHtml = this.content;

    if (this.projectData) {
      // 1. Dynamic Title Replacement
      finalHtml = finalHtml.replace(
        /<title>.*<\/title>/, 
        `<title>${this.projectData.title} | Softwise Angola</title>`
      );

      // 2. Open Graph & Twitter Cards Injection
      const metaTags = `
        <meta name="description" content="${this.projectData.description}">
        <meta property="og:title" content="${this.projectData.title} | Softwise">
        <meta property="og:image" content="${this.projectData.imageUrl}">
        <meta name="twitter:card" content="summary_large_image">
      `;

      // 3. Inject into Head
      finalHtml = finalHtml.replace('</head>', `${metaTags}</head>`);
      
      // 4. Inject JSON-LD for Rich Snippets
      finalHtml = finalHtml.replace('</body>', 
        `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></body>`
      );
    }
    
    this.push(finalHtml);
    callback();
  }
}


5. Development to Production

5.1 Local Development

We run the frontend and backend concurrently. The frontend proxies API requests to the backend to avoid CORS issues.

5.2 Production Build

We streamlined the build process into a single command that ensures version consistency between the UI and the API.

package.json script:

"build": "tsc -b && vite build && rm -rf ../backend/public/* && cp -r dist/* ../backend/public"
