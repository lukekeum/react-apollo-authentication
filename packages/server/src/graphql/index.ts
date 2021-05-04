import { makeExecutableSchema } from 'apollo-server-express';
import { buildTypeDefsAndResolvers } from 'type-graphql';

import ExampleResolver from './Example.graphql';
import UserResolver from './User.graphql';

async function generateSchema() {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [ExampleResolver, UserResolver],
    dateScalarMode: 'timestamp',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  return schema;
}

export default generateSchema;
