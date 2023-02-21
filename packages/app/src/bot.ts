import { Telegraf } from 'telegraf';

import { SceneNames } from './constants/scenes';
import type { ContextRequest } from './types/context';
import { scenes } from './scenes';
import { contextUserMiddleware } from './middleware/contextUser';
import { checkUserMiddleware } from './middleware/checkUser';

export const startBot = async ({ database, qiwi }) => {
  const bot = new Telegraf<ContextRequest>(process.env.BOT_TOKEN);
  await bot.telegram.setWebhook(`https://${process.env.HTTP_HOST}${process.env.BOT_WEBHOOK_PATH}`);

  bot.context.db = database;
  bot.context.qiwi = qiwi;

  bot
    .use(scenes.middleware())
    .use(contextUserMiddleware)
    .use(checkUserMiddleware)
    .start(async (ctx) => {
      await ctx.reply('Привет! \nоплата /payment');
    })
    .command('payment', async (ctx) => {
      await ctx.scene.enter(SceneNames.PAYMENT_SCENE);
    })

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
}
