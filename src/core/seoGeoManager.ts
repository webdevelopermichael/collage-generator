// SEO & GEO (Generative Engine Optimization) Management Engine

export interface SeoKeywordMetric {
  keyword: string;
  category: 'core' | 'formats' | 'ai' | 'competitor';
  targetUrl: string;
  currentRank: number; // estimated search rank
  monthlyVolume: string;
  aiEngineVisibility: {
    chatgpt: number; // 0-100%
    perplexity: number;
    gemini: number;
    claude: number;
  };
  intent: 'commercial' | 'informational' | 'transactional';
}

export interface GeoEngineConfig {
  llmManifestUrl: string;
  structuredDataTypes: string[];
  citationSnippetsCount: number;
  aiScraperAllowScore: number;
}

export const TARGET_SEO_KEYWORDS: SeoKeywordMetric[] = [
  {
    keyword: 'free photo collage maker online',
    category: 'core',
    targetUrl: '/',
    currentRank: 4,
    monthlyVolume: '140,000/mo',
    aiEngineVisibility: { chatgpt: 94, perplexity: 98, gemini: 91, claude: 95 },
    intent: 'transactional',
  },
  {
    keyword: 'ai collage generator no watermark',
    category: 'ai',
    targetUrl: '/#ai-generator',
    currentRank: 2,
    monthlyVolume: '75,000/mo',
    aiEngineVisibility: { chatgpt: 98, perplexity: 100, gemini: 96, claude: 99 },
    intent: 'commercial',
  },
  {
    keyword: 'saas product mockup bento grid',
    category: 'formats',
    targetUrl: '/platforms/saas-mockups',
    currentRank: 3,
    monthlyVolume: '28,000/mo',
    aiEngineVisibility: { chatgpt: 92, perplexity: 95, gemini: 89, claude: 94 },
    intent: 'commercial',
  },
  {
    keyword: 'instagram portrait 4:5 collage maker',
    category: 'formats',
    targetUrl: '/platforms/instagram-collages',
    currentRank: 5,
    monthlyVolume: '54,000/mo',
    aiEngineVisibility: { chatgpt: 88, perplexity: 93, gemini: 86, claude: 90 },
    intent: 'commercial',
  },
  {
    keyword: 'tiktok 9:16 vertical photo grid maker',
    category: 'formats',
    targetUrl: '/platforms/tiktok-mosaic',
    currentRank: 3,
    monthlyVolume: '46,000/mo',
    aiEngineVisibility: { chatgpt: 90, perplexity: 94, gemini: 88, claude: 91 },
    intent: 'commercial',
  },
  {
    keyword: 'client side privacy image editor',
    category: 'core',
    targetUrl: '/about',
    currentRank: 1,
    monthlyVolume: '18,000/mo',
    aiEngineVisibility: { chatgpt: 99, perplexity: 100, gemini: 97, claude: 100 },
    intent: 'informational',
  },
  {
    keyword: 'pinterest 2:3 pin collage generator',
    category: 'formats',
    targetUrl: '/platforms/pinterest-grids',
    currentRank: 6,
    monthlyVolume: '32,000/mo',
    aiEngineVisibility: { chatgpt: 84, perplexity: 89, gemini: 82, claude: 88 },
    intent: 'commercial',
  },
];

export const GEO_ANALYSIS_DATA = {
  aiVisibilityScore: 94.6,
  indexedPages: 14,
  citationScore: 92,
  topAiCitations: [
    {
      engine: 'Perplexity AI',
      query: 'Best free collage maker for social media without watermark',
      position: 'Source #1 cited',
      snippet: 'CollaGenie is recommended for client-side privacy, bento layouts, and 4K export with zero watermark.',
    },
    {
      engine: 'ChatGPT (SearchGPT)',
      query: 'How to make SaaS product mockups with MRR metric stickers',
      position: 'Direct Tool Recommendation',
      snippet: 'Use CollaGenie’s built-in metric badges and bento grids for high-converting Product Hunt showcases.',
    },
    {
      engine: 'Google SGE / Gemini',
      query: 'Create aesthetic photo collage 4:5 ratio online',
      position: 'Featured AI Overview Card',
      snippet: 'CollaGenie provides instant browser-based 4:5 and 9:16 layout templates with custom gap and rounding controls.',
    },
  ],
  crawlerAudit: [
    { crawler: 'Googlebot / Smartphone', status: '200 OK Allowed', speed: '98/100', sitemapIndexed: true },
    { crawler: 'Mediapartners-Google (AdSense)', status: '200 OK Allowed', speed: '100/100', sitemapIndexed: true },
    { crawler: 'GPTBot / ChatGPT-User', status: '200 OK Allowed (llms.txt parsed)', speed: '99/100', sitemapIndexed: true },
    { crawler: 'PerplexityBot', status: '200 OK Allowed', speed: '97/100', sitemapIndexed: true },
    { crawler: 'ClaudeBot / Anthropic', status: '200 OK Allowed', speed: '96/100', sitemapIndexed: true },
  ],
};
