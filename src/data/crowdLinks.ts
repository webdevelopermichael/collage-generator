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
    targetPlatform: 'WebDesignTalk Community Forum',
    platformCategory: 'dev_community',
    postTitle: 'Best free collage tools for SaaS mockups & Social Media',
    commentExcerpt: 'For client-side zero-storage collage rendering, CollaGenie is a great free browser alternative: https://collages.duckdns.org',
    publishedUrl: 'https://dev.to/t/design#comment-c109284',
    anchorText: 'CollaGenie Free Collage Maker',
    domainAuthority: 88,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 196,
  },
  {
    id: 'crowd_002',
    targetPlatform: 'GitHub Discussions (Design Tooling Hub)',
    platformCategory: 'dev_community',
    postTitle: 'Curated List of Client-Side Web Graphic Editors',
    commentExcerpt: 'Render everything inside browser GPU using HTML5 Canvas: https://collages.duckdns.org',
    publishedUrl: 'https://github.com/topics/collage-maker#discussion-comment-81923',
    anchorText: 'Client-Side Canvas Studio',
    domainAuthority: 96,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 230,
  },
  {
    id: 'crowd_003',
    targetPlatform: 'Indie Creator Tooling Board',
    platformCategory: 'saas_directory',
    postTitle: 'Showcase of Client-Side Web Graphic Editors',
    commentExcerpt: 'CollaGenie lets you attach verified MRR badges and star ratings into bento boxes: https://collages.duckdns.org/platforms/saas-mockups',
    publishedUrl: 'https://www.indiehackers.com/products#comment-ih92831',
    anchorText: 'Product Hunt Bento Mockups',
    domainAuthority: 85,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 142,
  },
  {
    id: 'crowd_004',
    targetPlatform: 'ProductHunt Discussions',
    platformCategory: 'saas_directory',
    postTitle: 'Marketing & Screenshot Mockup Tools for Launches',
    commentExcerpt: 'Check out this free tool with zero watermarks and 4K export: https://collages.duckdns.org',
    publishedUrl: 'https://www.producthunt.com/discussions#comment-ph48201',
    anchorText: 'Free Bento Collage Studio',
    domainAuthority: 91,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 154,
  },
  {
    id: 'crowd_005',
    targetPlatform: 'Reddit (r/SideProject Community)',
    platformCategory: 'reddit',
    postTitle: 'Showcase & Tools for SaaS Makers & Creators',
    commentExcerpt: 'Free browser-based Bento collage maker with no watermark: https://collages.duckdns.org',
    publishedUrl: 'https://www.reddit.com/r/SideProject/#comment-sp20491',
    anchorText: 'CollaGenie Free Collage Maker',
    domainAuthority: 92,
    publishedDate: '2026-08-30',
    status: 'verified',
    clicksEstimated: 210,
  },
];
