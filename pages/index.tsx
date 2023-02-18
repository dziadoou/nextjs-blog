import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Pagination from '../components/Pagination';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getPosts } from '../lib/posts';
import { getDateFormatter } from '../lib/intlFormatter';
import { paginate } from '../lib/paginate';
import { PostWithDate } from '../lib/types';

const pageSize = 10;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}

interface HomeProps {
  posts: PostWithDate[];
}

const Home = ({ posts }: HomeProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({query: { page: `${page}`}})
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize)

  useEffect(() => {
    if(!router.isReady) return;
    const query = router.query;
    Number(query.page) && setCurrentPage(Number(query.page))
  }, [router.isReady, router.query]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem orem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum ipsum</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {paginatedPosts.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {getDateFormatter('en-US').format(new Date(date))}
              </small>
            </li>
          ))}
        </ul>
      </section>
      <Pagination
        currentPage={currentPage}
        numberOfPosts={posts.length}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </Layout>
  );
}

export default Home;