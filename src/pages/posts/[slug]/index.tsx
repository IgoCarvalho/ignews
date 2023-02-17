import * as prismicH from '@prismicio/helpers';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '@/services/prismic';

import styles from './Post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>

          <time>{post.updatedAt}</time>

          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const slug = params?.slug;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', slug as string);

  const postDate = new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const post = {
    slug: response.uid,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content),
    updatedAt: postDate,
  };

  return {
    props: { post },
  };
};
