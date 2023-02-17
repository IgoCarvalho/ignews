import * as Prismic from '@prismicio/client';

export function getPrismicClient() {
  const endpoint = Prismic.getRepositoryEndpoint('igo-ignews');
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

  const prismic = Prismic.createClient(endpoint, { accessToken });

  return prismic;
}
