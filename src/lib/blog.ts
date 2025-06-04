import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  [key: string]: any; // for front matter
}

export interface BlogPostWithContent extends BlogPost {
  contentHtml: string;
}

interface FrontMatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
}

const postsDirectory = path.join(process.cwd(), "blog");

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const frontMatter = data as FrontMatter;

    return {
      slug,
      ...frontMatter,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPostWithContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = data as FrontMatter;

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...frontMatter,
  };
}

export function getAllPostSlugs(): { params: { slug: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    }));
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
