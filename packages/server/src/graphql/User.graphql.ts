import database from '../database';
import {
  Arg,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server-express';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id!: number;

  @Field()
  email!: string;

  @Field()
  nickname!: string;

  @Field()
  createdAt!: Date;
}

@ObjectType()
export class UserMessage {
  @Field({ nullable: true })
  message!: string;

  @Field(() => User, { nullable: true })
  user: User;
}

@Resolver()
export default class UserResolver {
  private _client = database.client;

  @Query(() => [User])
  async getUsers() {
    const users = await this._client.user.findMany();

    return users;
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id', () => Int) id: number) {
    try {
      const user = await this._client.user.findFirst({ where: { id } });

      if (!user) return null;

      return user;
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => UserMessage, { nullable: true })
  async loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    try {
      const user = await this._client.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return { message: 'User not found' };

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) return { message: 'Password Incorrect' };

      return { user };
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => User)
  async registerUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('nickname') nickname: string
  ) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await this._client.user.create({
        data: {
          email,
          password: hashedPassword,
          nickname,
        },
      });

      return createdUser;
    } catch (err) {
      return err;
    }
  }
}
