import dotenv from 'dotenv';
import { resolve } from 'path';
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk';

import { UserEntity } from './entities/User';
import { OrderEntity } from './entities/Order';

import { startBot } from './bot';
import db from './db';

import { startAppServer } from './servers/appServer';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config({
      path: resolve(__dirname, `../../../ci/dev/.env`),
    });
  }

  const qiwi = new QiwiBillPaymentsAPI(process.env.QIWI_P2P_SECRET_KEY);

  const database = await db([
    UserEntity,
    OrderEntity,
  ]);

  const bot = await startBot({ qiwi, database });
  await startAppServer({ bot, database, qiwi });
})();
