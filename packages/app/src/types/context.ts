import type { Scenes, Telegraf } from 'telegraf';
import type { WizardSessionData } from 'telegraf/typings/scenes';
import type { DataSource } from 'typeorm';
import type QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk';

export interface SessionType {
  poll: { isAnonymous: boolean; text: string };
  __scenes: any;
}

export interface ContextRequest<T extends WizardSessionData = WizardSessionData> extends Scenes.WizardContext<T>{
  session: SessionType;
  route: string;
  bot: Telegraf;
  message: any;
  qiwi: QiwiBillPaymentsAPI;
  db: DataSource;
  callbackQuery: Scenes.WizardContext['callbackQuery'] & {
    data?: string;
  },
}
