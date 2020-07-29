import Head from 'next/head'
import Link from 'next/link'

import {
  useGetViewerQuery,
  GetViewerDocument,
} from '../queries/generated/graphql'
import { initializeApollo } from '../lib/apollo'

export const Home = (): JSX.Element => {
  const { data } = useGetViewerQuery()
  const { viewer } = data!
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        You're signed in as {viewer.name} and you're {viewer.status} go to the{' '}
        <Link href="/about">
          <a>about</a>
        </Link>{' '}
        page.
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
