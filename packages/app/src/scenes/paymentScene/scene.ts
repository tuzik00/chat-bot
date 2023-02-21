import {
  Markup,
  Scenes,
} from 'telegraf';

import type { ContextRequest } from '../../types/context';

import {
  Currency,
  Status,
} from '../../entities/Order';

import { SceneNames } from '../../constants/scenes';
import { createOrder } from '../../api/order';
import { createPaymentForm } from '../../api/qiwi';

const getSelectionKeyboard = (ctx) => Markup.inlineKeyboard([
  [Markup.button.callback('Купить 100 токенов ', 'payment')],
]);

export const scene = new Scenes.BaseScene<ContextRequest>(SceneNames.PAYMENT_SCENE)
  .enter(async (ctx) => {
    return await ctx.reply(
      'Оплатить подписку',
      getSelectionKeyboard(ctx),
    );
  })
  .action('payment', async (ctx) => {
    let order = null;

    try {
      order = await createOrder(ctx, {
        status: Status.WAITING,
        currency: Currency.RUB,
        amount: '100',
      });
    } catch (e) {
      console.log('ошибка')
    }

    await ctx.deleteMessage();

    return await ctx.reply(
      'Купить 100 токенов',
      Markup.inlineKeyboard([
        [Markup.button.url('Qiwi', createPaymentForm(ctx, order))],
        [Markup.button.callback('Вернуться назад', 'payment:back')],
      ]),
    );
  });
