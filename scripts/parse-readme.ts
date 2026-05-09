import fs from 'fs';
import path from 'path';

interface Prompt {
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

function parseReadme(filePath: string): Prompt[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const prompts: Prompt[] = [];
  
  // Split by prompt sections
  const sections = content.split(/### No\. \d+:/);
  
  // The first section is the header, skip it
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    const titleMatch = section.match(/^(.*)/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    const featured = section.includes('![Featured]');
    
    const descriptionMatch = section.match(/#### 📖 Description\n\n([\s\S]*?)\n\n/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';
    
    const promptMatch = section.match(/#### 📝 Prompt\n\n```\n([\s\S]*?)\n```/);
    const promptText = promptMatch ? promptMatch[1].trim() : '';
    
    const images: string[] = [];
    const imageMatches = section.matchAll(/<img src="(.*?)"/g);
    for (const match of imageMatches) {
      images.push(match[1]);
    }
    
    const authorMatch = section.match(/\*\*Author:\*\* \[(.*?)\]\((.*?)\)/);
    const author = authorMatch ? authorMatch[1] : '';
    const authorLink = authorMatch ? authorMatch[2] : '';
    
    const sourceMatch = section.match(/\*\*Source:\*\* \[(.*?)\]\((.*?)\)/);
    const source = sourceMatch ? sourceMatch[2] : '';
    
    const publishedMatch = section.match(/\*\*Published:\*\* (.*)/);
    const published = publishedMatch ? publishedMatch[1].trim() : '';
    
    const languagesMatch = section.match(/\*\*Languages:\*\* (.*)/);
    const languages = languagesMatch ? languagesMatch[1].split(',').map(l => l.trim()) : [];
    
    const idMatch = section.match(/\?id=(\d+)/);
    const id = idMatch ? idMatch[1] : `p-${i}`;

    // Extract category from title if possible (e.g. "Profile / Avatar - ...")
    let category = 'Uncategorized';
    if (title.includes(' - ')) {
      category = title.split(' - ')[0].trim();
    }
    
    // Only include English prompts
    if (languages.includes('en') || languages.length === 0) {
      prompts.push({
        id,
        title,
        description,
        prompt: promptText,
        images,
        author,
        authorLink,
        source,
        published,
        languages,
        featured,
        category
      });
    }
  }
  
  return prompts;
}

const prompts = parseReadme('README.md');
fs.writeFileSync('public/prompts.json', JSON.stringify(prompts, null, 2));
console.log(`Parsed ${prompts.length} English prompts to public/prompts.json`);
