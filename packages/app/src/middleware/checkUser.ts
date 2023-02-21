import { isChatMemberSubscribe } from '../api/chat';
import { SceneNames } from '../constants/scenes';
import { isActivePayment } from '../api/user';

export const checkUserMiddleware = async (ctx, next) => {
  let isSubscribe = false;

  try {
    isSubscribe = await isChatMemberSubscribe(ctx);
  } catch (e) {
    return await ctx.scene.enter(SceneNames.ERROR_SCENE);
  }

  if (!isSubscribe) {
    return await ctx.scene.enter(SceneNames.SUBSCRIBE_SCENE, {
      isNew: false,
    });
  }

  let isPay = false;

  try {
    isPay = await isActivePayment(ctx);
  } catch (e) {
    return await ctx.scene.enter(SceneNames.ERROR_SCENE);
  }

  if (!isPay) {
    return await ctx.reply('👉 Вы можете продлить её в разделе "Меню -> Оплата".');
  }

  await next();
}
