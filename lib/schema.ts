import { resolve } from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const path = resolve(process.env.ROOT, './lib/types/**/*.graphql')

const typesArray = loadFilesSync(path, {
  recursive: true,
})

export const typeDefs = mergeTypeDefs(typesArray)

export const schema = makeExecutableSchema({ typeDefs, resolvers })
