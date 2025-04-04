import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = 'oj0fldpz';
export const dataset = 'production';
export const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  withCredentials: true,
});

console.log('Sanity client initialized with project:', projectId, 'dataset:', dataset);

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getPosts() {
  return await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    categories[]->{
      _id,
      title
    },
    publishedAt,
    author->{
      name,
      image
    },
    excerpt,
    featured,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }`);
}

export async function getPost(slug) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      categories[]->{
        _id,
        title
      },
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      body,
      excerpt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { slug }
  );
}

export async function getCategories() {
  return await client.fetch(`*[_type == "category"] {
    _id,
    title,
    description
  }`);
}

export async function getPostsByCategory(categoryId) {
  return await client.fetch(
    `*[_type == "post" && references($categoryId)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      categories[]->{
        _id,
        title
      },
      publishedAt,
      author->{
        name,
        image
      },
      excerpt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { categoryId }
  );
}

export async function getFeaturedPosts() {
  return await client.fetch(`*[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }`);
} 