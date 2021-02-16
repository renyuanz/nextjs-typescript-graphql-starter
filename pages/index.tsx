import Head from 'next/head'
import Link from 'next/link'

import {
  useGetViewerQuery,
  GetViewerDocument,
} from '../queries/generated/graphql'
import { initializeApollo } from '../lib/apollo'

export const Home = (): JSX.Element => {
  const { data, loading, error } = useGetViewerQuery()

  const handleClick = () => window.alert('With typescript and Jest')

  if (loading) return <div>loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        You&apos;re signed in as {data?.viewer.name} and you&apos;re{' '}
        {data?.viewer.status} go to the{' '}
        <Link href="/about">
          <a>about</a>
        </Link>{' '}
        page.
        <button onClick={handleClick}>Test Button</button>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GetViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Home
