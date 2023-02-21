import {
  createUser,
  getUserByTelegramId,
} from '../api/user';

import { getCtxUserInfo } from '../utils/context';
import { SceneNames } from '../constants/scenes';

export const contextUserMiddleware = async (ctx, next) => {
  const userInfo = getCtxUserInfo(ctx);

  if (!userInfo) {
    return;
  }

  let user = await getUserByTelegramId(ctx, userInfo.id);

  if (!user) {
    try {
      user = await createUser(ctx, {
        username: userInfo.username,
        lastName: userInfo.last_name,
        firstName: userInfo.first_name,
        telegramId: userInfo.id,
      });
    } catch (e) {
      return await ctx.scene.enter(SceneNames.ERROR_SCENE);
    }
  }

  ctx.user = user;

  await next();
}
