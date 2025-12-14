import CyrillicToTranslit from 'cyrillic-to-translit-js';

const transliterate = CyrillicToTranslit();

export function generateSlug(title: string): string {
  if (!title || title.trim() === '') {
    throw new Error('Title is required to generate slug');
  }

  const transliterated = transliterate.transform(title);
  const slug = transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (!slug) {
    throw new Error('Unable to generate slug from title');
  }

  return slug;
}
