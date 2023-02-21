import { Scenes } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';

import { scene as paymentScene } from './paymentScene';
import { scene as subscribeScene } from './subscribeScene';
import { scene as errorScene } from './errorScene';

export const scenes = new Scenes.Stage<WizardContext>([
  subscribeScene,
  paymentScene,
  errorScene,
]);
