import Fastify from 'fastify';

import botPlugin from './plugins/bot';
import paymentPlugin from './plugins/payment';

export const startAppServer = async ({ qiwi, bot, database }) => {
  const [, port] = process.env.HTTP_LISTEN?.split(':') ?? [];
  const app = Fastify();

  app.register(botPlugin({ bot }));
  app.register(paymentPlugin({ qiwi, database }));

  const url = await app.listen(
    parseInt(port, 10),
    '0.0.0.0',
  );

  console.log('[app]', `Ready on ${url}`);

  return app;
};
