import Link from 'next/link'

import { useGetViewerQuery } from '../queries/generated/graphql'

export default function About(): JSX.Element {
  const { data, loading, error } = useGetViewerQuery()

  if (loading) return <div>loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div className="container">
      <div>
        You&apos;re signed in as {data?.viewer.name} and you&apos;re{' '}
        {data?.viewer.status} go to the{' '}
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        page.
      </div>
    </div>
  )
}
