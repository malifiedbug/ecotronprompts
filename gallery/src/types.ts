export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  images: string[];
  author: string;
  authorLink: string;
  source: string;
  published: string;
  languages: string[];
  featured: boolean;
  category: string;
}
