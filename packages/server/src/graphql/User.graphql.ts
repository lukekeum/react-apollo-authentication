import database from '../database';
import {
  Arg,
  Field,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id!: number;

  @Field()
  email!: string;

  @Field()
  nickname!: string;

  @Field()
  createAt!: Date;

  @Field()
  updateAt!: Date;
}

@Resolver()
export default class UserResolver {
  private _client = database.client;

  @Query(() => [User])
  async getUsers() {
    const users = await this._client.user.findMany();

    return users;
  }

  @Query(() => User)
  async getUserById(@Arg('id', () => Int) id: number) {
    const user = await this._client.user.findFirst({ where: { id: id } });

    if (!user) return null;

    return user;
  }

  @Mutation(() => User)
  async registerUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('nickname') nickname: string
  ) {
    try {
      const createdUser = await this._client.user.create({
        data: {
          email,
          password,
          nickname,
        },
      });

      return createdUser;
    } catch (err) {
      return err;
    }
  }
}
