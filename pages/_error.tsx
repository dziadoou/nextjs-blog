import Layout from "../components/Layout"

const Error = ({ statusCode }) => {
  if (statusCode === 404) {
    return (
      <Layout home={false}>
        <p>
          Page not found :(
        </p>
      </Layout>
    )
  }

  return (
    <Layout home={false}>
      <p>
        {statusCode && `An error ${statusCode} occurred`}
      </p>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error