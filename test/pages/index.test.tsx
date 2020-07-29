import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { readFileSync } from 'fs'
import { render, fireEvent } from '../testUtils'
import { Home } from '../../pages/index'

// const mocks = [
//   {
//     request: {
//       query: readFileSync('../../lib/viewer.graphql', 'utf-8'),
//       variables: { first: 4 },
//     },
//     result: {
//       data: {
//         dog: {
//           name: 'Douglas',
//         },
//       },
//     },
//   },
// ]

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      // FIXME: wait graphql-let to update higher than 0.12
      // <MockedProvider mocks={mocks}>
      <Home />,
      // </MockedProvider>,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
