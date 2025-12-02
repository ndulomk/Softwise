import { Transform, TransformCallback } from "stream";
import { TProjectResponse } from "../types/project.types.js";

export class SeoInjectorStream extends Transform {
  private content: string = "";
  private projectData: TProjectResponse | null;

  constructor(projectData: TProjectResponse | null) {
    super();
    this.projectData = projectData;
  }

  override _transform(chunk: any, _encoding: string, callback: TransformCallback): void {
    this.content += chunk.toString();
    callback();
  }

  override _flush(callback: TransformCallback): void {
    let finalHtml = this.content;

    const defaultKeywords = [
      "Software House Angola", "Desenvolvimento Web Luanda", "Criar App Angola",
      "Empresa Tecnologia Angola", "Programação Angola", "Developer Angola",
      "IT Services Luanda", "Tech Company Angola", "Agência Digital Luanda",
      
      "Desenvolvimento Web", "Criação de Sites", "Aplicativos Mobile",
      "Sistemas de Gestão", "E-commerce Angola", "API Development",
      "Backend Development", "Frontend Development", "Full Stack Development",
      
      "React Angola", "TypeScript", "Bun Runtime", "Node.js",
      "PostgreSQL", "Docker", "Tailwind CSS", "REST API",
      
      "Software Personalizado", "Consultoria TI", "Transformação Digital",
      "Soluções Empresariais", "ERP Angola", "CRM Angola"
    ].join(", ");
    
    const currentKeywords = this.projectData 
      ? `${this.projectData.tags.join(", ")}, ${defaultKeywords}`
      : defaultKeywords;

    const title = this.projectData 
      ? `${this.projectData.title} | Softwise Angola - Desenvolvimento de Software` 
      : 'Softwise Angola | Desenvolvimento Web & Apps | Software House Luanda';
    
    const description = this.projectData 
      ? this.projectData.description.substring(0, 155) + "..."
      : 'Softwise é a Software House líder em Angola. Desenvolvemos websites, apps mobile e sistemas de gestão com React, TypeScript e Bun. Solicite orçamento!';

    const image = this.projectData?.imageUrl || 'https://softwise.onrender.com/logo.jpeg';
    const url = this.projectData 
      ? `https://softwise.onrender.com/project/${this.projectData.slug}` 
      : 'https://softwise.onrender.com';

    finalHtml = finalHtml.replace(/<title>.*<\/title>/, `<title>${title}</title>`);

    const metaTags = `
      <!-- Meta Tags Essenciais -->
      <meta name="description" content="${description}">
      <meta name="keywords" content="${currentKeywords}">
      <meta name="author" content="Softwise Angola">
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
      <link rel="canonical" href="${url}">
      
      <!-- Geolocalização -->
      <meta name="geo.region" content="AO-LUA">
      <meta name="geo.placename" content="Luanda">
      <meta name="geo.position" content="-8.838333;13.234444">
      <meta name="ICBM" content="-8.838333, 13.234444">
      
      <!-- Open Graph / Facebook / WhatsApp -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="${url}">
      <meta property="og:site_name" content="Softwise Angola">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${image}">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="og:image:alt" content="Softwise Angola - Software House">
      <meta property="og:locale" content="pt_AO">
      <meta property="og:locale:alternate" content="pt_PT">

      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:url" content="${url}">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${image}">
      <meta name="twitter:image:alt" content="Softwise Angola - Desenvolvimento de Software">
      
      <!-- Verificação e Performance -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="theme-color" content="#006C93">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
      <meta name="apple-mobile-web-app-title" content="Softwise">
    `;

    finalHtml = finalHtml.replace('</head>', `${metaTags}</head>`);
    
    const jsonLdOrg = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": "Softwise Angola",
      "alternateName": "Softwise",
      "description": "Software House especializada em desenvolvimento web, apps mobile e sistemas de gestão em Luanda, Angola.",
      "image": [
        "https://softwise.onrender.com/logo.jpeg"
      ],
      "logo": "https://softwise.onrender.com/logo.jpeg",
      "url": "https://softwise.onrender.com",
      "telephone": "+244923000000",
      "email": "hello@softwise.ao",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Talatona",
        "addressLocality": "Luanda",
        "addressRegion": "Luanda",
        "postalCode": "0000",
        "addressCountry": "AO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -8.838333,
        "longitude": 13.234444
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -8.838333,
          "longitude": 13.234444
        },
        "geoRadius": "50000"
      },
      "priceRange": "$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/softwise-angola",
        "https://www.instagram.com/softwise.ao",
        "https://github.com/softwise"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "24"
      }
    };

    const jsonLdProject = this.projectData ? {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": this.projectData.title,
      "description": this.projectData.description,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "AOA"
      },
      "author": {
        "@type": "Organization",
        "name": "Softwise Angola"
      }
    } : null;

    const jsonLdBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://softwise.onrender.com"
        },
        this.projectData ? {
          "@type": "ListItem",
          "position": 2,
          "name": "Projetos",
          "item": "https://softwise.onrender.com/#projetos"
        } : null,
        this.projectData ? {
          "@type": "ListItem",
          "position": 3,
          "name": this.projectData.title,
          "item": `https://softwise.onrender.com/project/${this.projectData.slug}`
        } : null
      ].filter(Boolean)
    };

    const jsonLdWebsite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Softwise Angola",
      "url": "https://softwise.onrender.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://softwise.onrender.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    let scripts = `
      <script type="application/ld+json">${JSON.stringify(jsonLdOrg)}</script>
      <script type="application/ld+json">${JSON.stringify(jsonLdWebsite)}</script>
      <script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb)}</script>
    `;
    
    if (jsonLdProject) {
      scripts += `<script type="application/ld+json">${JSON.stringify(jsonLdProject)}</script>`;
    }
    
    finalHtml = finalHtml.replace('</body>', `${scripts}</body>`);

    this.push(finalHtml);
    callback();
  }
}