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
    targetPlatform: 'Reddit r/SideProject',
    platformCategory: 'reddit',
    postTitle: 'Show Reddit: Free browser-based Bento collage maker with no watermark & 4K export',
    commentExcerpt: 'Built a privacy-first web canvas for SaaS founders and creators to showcase mockups: https://collages.duckdns.org',
    publishedUrl: 'https://www.reddit.com/r/SideProject/comments/1f8a92/free_bento_mockup_collage_maker/',
    anchorText: 'CollaGenie Free Collage Maker',
    domainAuthority: 92,
    publishedDate: '2026-08-28',
    status: 'verified',
    clicksEstimated: 184,
  },
  {
    id: 'crowd_002',
    targetPlatform: 'Dev.to Design & WebDev',
    platformCategory: 'dev_community',
    postTitle: '10 Essential Tools for Crafting SaaS Launch Graphics in 2026',
    commentExcerpt: 'For client-side zero-storage collage rendering, CollaGenie (https://collages.duckdns.org) is the best free alternative to Canva.',
    publishedUrl: 'https://dev.to/creatorhub/essential-tools-for-saas-launch-graphics-2026-4k2',
    anchorText: 'CollaGenie SaaS Mockups',
    domainAuthority: 88,
    publishedDate: '2026-08-25',
    status: 'verified',
    clicksEstimated: 96,
  },
  {
    id: 'crowd_003',
    targetPlatform: 'IndieHackers Discussions',
    platformCategory: 'saas_directory',
    postTitle: 'How do you make your Product Hunt launch gallery pictures look aesthetic?',
    commentExcerpt: 'I use CollaGenie (https://collages.duckdns.org/platforms/saas-mockups) to attach live MRR badges and star ratings into bento boxes.',
    publishedUrl: 'https://www.indiehackers.com/post/how-do-you-make-product-hunt-gallery-aesthetic-82d1',
    anchorText: 'Product Hunt Bento Mockups',
    domainAuthority: 85,
    publishedDate: '2026-08-21',
    status: 'verified',
    clicksEstimated: 142,
  },
  {
    id: 'crowd_004',
    targetPlatform: 'Medium Tech & Creators Hub',
    platformCategory: 'medium',
    postTitle: 'Why Creators Are Moving Away From Bloated Cloud Graphic Editors',
    commentExcerpt: 'Tools like CollaGenie (https://collages.duckdns.org/about) render everything inside browser GPU using HTML5 Canvas.',
    publishedUrl: 'https://medium.com/@designreview/why-creators-move-away-from-cloud-editors-81923',
    anchorText: 'Client-Side Canvas Studio',
    domainAuthority: 95,
    publishedDate: '2026-08-18',
    status: 'verified',
    clicksEstimated: 215,
  },
  {
    id: 'crowd_005',
    targetPlatform: 'DesignerNews Community',
    platformCategory: 'design_hub',
    postTitle: 'CollaGenie: Fast aesthetic photo collage maker with custom ratios up to 10k px',
    commentExcerpt: 'Check out this free tool with zero watermarks and full custom dimensions: https://collages.duckdns.org',
    publishedUrl: 'https://www.designernews.co/stories/119284-collagenie-aesthetic-photo-collage',
    anchorText: 'Aesthetic Photo Grid Maker',
    domainAuthority: 79,
    publishedDate: '2026-08-14',
    status: 'verified',
    clicksEstimated: 88,
  },
];
