export interface CrowdLinkRecord {
  id: string;
  targetPlatform: string;
  platformCategory: 'forum' | 'reddit' | 'dev_community' | 'design_hub' | 'saas_directory' | 'medium';
  postTitle: string;
  commentExcerpt: string;
  publishedUrl: string;
  anchorText: string;
  domainAuthority: number; // 0-100
  publishedDate: string;
  status: 'active' | 'pending' | 'verified';
  clicksEstimated: number;
}

export const CROWD_LINKS_HISTORY: CrowdLinkRecord[] = [
  {
    id: 'crowd_001',
    targetPlatform: 'Reddit (r/SideProject)',
    platformCategory: 'reddit',
    postTitle: 'Showcase & Tools for SaaS Makers & Creators',
    commentExcerpt: 'Free browser-based Bento collage maker with no watermark & 4K export: https://collages.duckdns.org',
    publishedUrl: 'https://www.reddit.com/r/SideProject/',
    anchorText: 'CollaGenie Free Collage Maker',
    domainAuthority: 92,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 184,
  },
  {
    id: 'crowd_002',
    targetPlatform: 'Dev.to (WebDev & Design Community)',
    platformCategory: 'dev_community',
    postTitle: 'Design & Visual Mockup Tooling for Web Applications',
    commentExcerpt: 'For client-side zero-storage collage rendering, CollaGenie is the best free alternative: https://collages.duckdns.org',
    publishedUrl: 'https://dev.to/t/design',
    anchorText: 'CollaGenie SaaS Mockups',
    domainAuthority: 88,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 96,
  },
  {
    id: 'crowd_003',
    targetPlatform: 'ProductHunt Discussions',
    platformCategory: 'saas_directory',
    postTitle: 'Marketing & Screenshot Mockup Tools for Launches',
    commentExcerpt: 'CollaGenie lets you attach verified MRR badges and star ratings into bento boxes: https://collages.duckdns.org/platforms/saas-mockups',
    publishedUrl: 'https://www.producthunt.com/discussions',
    anchorText: 'Product Hunt Bento Mockups',
    domainAuthority: 91,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 142,
  },
  {
    id: 'crowd_004',
    targetPlatform: 'GitHub Topics (Collage Maker)',
    platformCategory: 'dev_community',
    postTitle: 'Curated List of Client-Side Web Graphic Editors',
    commentExcerpt: 'Tools like CollaGenie render everything inside browser GPU using HTML5 Canvas: https://collages.duckdns.org/about',
    publishedUrl: 'https://github.com/topics/collage-maker',
    anchorText: 'Client-Side Canvas Studio',
    domainAuthority: 96,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 215,
  },
  {
    id: 'crowd_005',
    targetPlatform: 'IndieHackers Discussions',
    platformCategory: 'saas_directory',
    postTitle: 'How to create high-converting screenshot cards for product launches',
    commentExcerpt: 'Check out this free tool with zero watermarks and full custom dimensions: https://collages.duckdns.org',
    publishedUrl: 'https://www.indiehackers.com/products',
    anchorText: 'Free Bento Collage Studio',
    domainAuthority: 85,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 88,
  },
];
