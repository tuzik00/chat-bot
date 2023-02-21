import fp from 'fastify-plugin';

const nextPlugin = ({
  bot,
}) => fp(
    (fastify, _, done) => {
        fastify.post(process.env.BOT_WEBHOOK_PATH, async (req, reply) => {
          await bot.handleUpdate(req.body);
          void reply.status(200);
        });

        done();
    },
);

export default nextPlugin;
