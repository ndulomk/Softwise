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

    if (this.projectData) {
      finalHtml = finalHtml.replace(
        /<title>.*<\/title>/, 
        `<title>${this.projectData.title} | Softwise Angola</title>`
      );

      const metaTags = `
        <meta name="description" content="${this.projectData.description}">
        <meta property="og:title" content="${this.projectData.title} | Softwise">
        <meta property="og:description" content="${this.projectData.description}">
        <meta property="og:image" content="${this.projectData.imageUrl}">
        <meta name="twitter:card" content="summary_large_image">
      `;

      finalHtml = finalHtml.replace('</head>', `${metaTags}</head>`);
      
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": this.projectData.title,
        "description": this.projectData.description,
        "author": {
             "@type": "Organization",
             "name": "Softwise Angola"
        }
      };
      
      finalHtml = finalHtml.replace('</body>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></body>`);
    } else {
         finalHtml = finalHtml.replace(
            /<title>.*<\/title>/, 
            `<title>Softwise | Software House Angolana</title>`
          );
         finalHtml = finalHtml.replace('</head>', `<meta name="description" content="Software house angolana de alta performance. Desenvolvemos sistemas escaláveis, apps e sites brutalistas."></head>`);
    }

    this.push(finalHtml);
    callback();
  }
}