import {
  Markup,
  Scenes,
} from 'telegraf';

import type { ContextRequest } from '../../types/context';

import { SceneNames } from '../../constants/scenes';
import { isChatMemberSubscribe } from '../../api/chat';

const getLangSelectionKeyboard = (ctx) => Markup.inlineKeyboard([[
  Markup.button.callback('Проверить подписку', 'subscribe:check'),
]]);

export const scene = new Scenes.BaseScene<ContextRequest>(SceneNames.SUBSCRIBE_SCENE)
  .enter(async (ctx) => {
    const {
      isNew
    } = ctx.scene.state as { isNew: boolean };

    let text;

    if (isNew) {
      text = `Отлично!\n\nЧтобы продолжить использование бота, вам необходимо подписаться на наш канал ${process.env.CHAT_INVITE_LINK}.`;
    } else {
      text = `🙁 Вы не подписаны на канал. ${process.env.CHAT_INVITE_LINK}`;
    }

    await ctx.reply(
      text,
      getLangSelectionKeyboard(ctx),
    );
  })
  .action('subscribe:check', async (ctx) => {
    let isSubscribe = false;

    try {
      isSubscribe = await isChatMemberSubscribe(ctx);
    } catch (e) {
      console.log(e);
    }

    if (!isSubscribe) {
      return await ctx.reply('🙂 Для взаимодействия с ботом вы должны быть подписаны на наш канал.');
    }

    await ctx.deleteMessage();
    await ctx.reply('🙏 Благодарим за подписку на наш канал, теперь вы можете пользоваться ботом')
  });
