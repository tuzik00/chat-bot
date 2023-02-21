import fp from 'fastify-plugin';

import { UserEntity } from '../../entities/User';

import {
  OrderEntity,
  Status,
} from '../../entities/Order';

const nextPlugin = ({
  database,
  qiwi,
}) => fp(
  (fastify, _, done) => {
    fastify.get('/payment/', async (req, reply) => {
      const {
        userId,
        orderId,
      } = req.query as { userId: string; orderId: string; };

      try {
        const user = await database.getRepository(UserEntity).findOne({
          where: {
            id: parseInt(userId),
          },
        });

        if (!user) {
          return reply.send('Bad link');
        }

        const order = await database.getRepository(OrderEntity).findOne({
          where: {
            orderId,
            user: {
              id: user.id,
            },
          },
        });

        if (!order) {
          return reply.send('Bad link');
        }

        if (order.status === Status.PAID) {
          return reply.send('Order paid');
        }

        const billingInfo = await qiwi.getBillInfo(order.orderId);

        if (!billingInfo) {
          return reply.send('Not found information about order');
        }

        if (billingInfo.status.value === Status.REJECTED) {
          order.status = Status.REJECTED;
          await database.getRepository(OrderEntity).save(order);

          return reply.send('Order rejected');
        }

        if (billingInfo.status.value === Status.PARTIAL) {
          order.status = Status.PARTIAL;
          await database.getRepository(OrderEntity).save(order);

          return reply.send('Order partial');
        }

        if (billingInfo.status.value === Status.WAITING) {
          order.status = Status.WAITING;
          await database.getRepository(OrderEntity).save(order);

          return reply.send('Order waiting');
        }

        if (billingInfo.status.value === Status.PAID) {
          if (order.amount !== billingInfo.amount.value) {
            return reply.send('Order error');
          }

          if (order.currency !== billingInfo.amount.currency) {
            return reply.send('Order error');
          }

          order.status = Status.PAID;
          order.paymentDate = new Date();

          await database.getRepository(OrderEntity).save(order);

          user.tokens += 100;

          await database.getRepository(UserEntity).save(user);

          return reply.redirect(`${process.env.BOT_INVITE_LINK}?start=paid`);
        }
      } catch (e) {
        return reply.send('Something went wrong try again');
      }

      return reply.send('');
    });

    done();
  },
);

export default nextPlugin;
