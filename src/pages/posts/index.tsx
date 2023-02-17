import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as prismicH from '@prismicio/helpers';

import { getPrismicClient } from '@/services/prismic';

import styles from './Posts.module.scss';

interface Post {
  slug: string;
  title: string;
  except: string;
  updatedAt: string;
}
interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.except}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType('post', { fetch: ['post.title', 'post.content'] });

  const posts = response.map((post) => {
    const exceptText =
      post.data.content.find((content: Record<string, string>) =>
        /paragraph|heading/i.test(content.type)
      )?.text ?? '';

    const postDate = new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      except: exceptText,
      updatedAt: postDate,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
