import Layout from '../../components/Layout';
import Head from 'next/head';
import { getPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getDateFormatter } from '../../lib/intlFormatter';

const Post = ({ postData }) => {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {getDateFormatter('en-US').format(new Date(postData.date))}
        </div>
        <p>
          {postData.body}
        </p>
      </article>
    </Layout>
  );
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id.toString());

  return {
    props: {
      postData,
    },
  };
}
