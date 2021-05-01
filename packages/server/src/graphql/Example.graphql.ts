import { Query, Resolver } from 'type-graphql';

@Resolver()
export default class ExampleResolver {
  @Query(() => String)
  async hello() {
    return 'Hello';
  }
}
