import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import gql from 'graphql-tag'
import { render, fireEvent, wait } from '../testUtils'
import { Home } from '../../pages/index'
import { act } from 'react-dom/test-utils'

const mocks = [
  {
    request: {
      query: gql(
        readFileSync(
          resolve(__dirname, '../../queries/viewer.graphql'),
          'utf-8'
        )
      ),
    },
    result: {
      data: {
        viewer: {
          id: '1',
          name: 'Douglas',
          status: 'cached',
        },
      },
    },
  },
]

const mocksError = [
  {
    request: {
      query: gql(
        readFileSync(
          resolve(__dirname, '../../queries/viewer.graphql'),
          'utf-8'
        )
      ),
    },
    error: new Error('mocks error'),
  },
]

describe('Home page', () => {
  it('matches loading state snapshot', async () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    )

    // test loading state
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches final state snapshot', async () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    )

    // wait 0ms to jump event loop next tick
    await act(async () => {
      await wait(0)
    })

    // test final state
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches error state snapshot', async () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocksError}>
        <Home />
      </MockedProvider>
    )

    // wait 0ms to jump event loop next tick
    await act(async () => {
      await wait(0)
    })

    // test error state
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
    })

    window.alert = jest.fn()
    fireEvent.click(getByText('Test Button'))
    expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
