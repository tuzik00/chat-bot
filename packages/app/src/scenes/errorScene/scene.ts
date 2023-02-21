import { Scenes } from 'telegraf';

import type { ContextRequest } from '../../types/context';
import { SceneNames } from '../../constants/scenes';

export const scene = new Scenes.BaseScene<ContextRequest>(SceneNames.ERROR_SCENE)
  .enter(async (ctx) => {
    await ctx.reply('Ошибка');
  });
