import { UserEntity } from '../entities/User';

interface UserInput {
  telegramId?: string;
  username?: string;
  lastName?: string;
  firstName?: string;
}

export const getUserById = async (ctx, userId: number) => {
  return await ctx.db.getRepository(UserEntity).findOne({
    where: {
      id: userId,
    },
  });
}

export const createUser = async (ctx, params: UserInput) => {
  const userEntity = new UserEntity();

  userEntity.createdDate = new Date();
  userEntity.telegramId = params.telegramId;
  userEntity.username = params.username;
  userEntity.lastName = params.lastName;
  userEntity.firstName = params.firstName;

  await ctx.db.getRepository(UserEntity).save(userEntity);

  return userEntity;
};

export const isActivePayment = async (ctx) => {
  const userEntity = ctx?.user;

  if (!userEntity) {
    return false;
  }

  return userEntity.tokens > 0;
}

export const getUserByTelegramId = async (ctx, telegramId: string) => {
  return await ctx.db.getRepository(UserEntity).findOne({
    where: {
      telegramId,
    },
  });
}
