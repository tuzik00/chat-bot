import uuid from 'short-uuid';

import {
  Status,
  Currency,
  OrderEntity,
} from '../entities/Order';

interface OrderInput {
  currency: Currency;
  amount: string;
  status: Status;
}

export const getOrder = async (ctx, orderId) => {
  const user = ctx.user;

  if (!user) {
    return null;
  }

  return await ctx.db.getRepository(OrderEntity).find({
    where: {
      id: orderId,
      user,
    },
  });
}

export const createOrder = async (ctx, params: OrderInput) => {
  const user = ctx.user;

  if (!user) {
    return null;
  }

  const orderEntity = new OrderEntity();
  orderEntity.user = user;
  orderEntity.createdDate = new Date()
  orderEntity.orderId = uuid.generate()
  orderEntity.refundId = uuid.generate();
  orderEntity.status = params.status;
  orderEntity.amount = params.amount;
  orderEntity.currency = params.currency;

  return await ctx.db.getRepository(OrderEntity).save(orderEntity);
}

export const updateOrder = async (ctx, orderId, params: OrderInput) => {
  const user = ctx.user;

  if (!user) {
    return null;
  }

  const order = await getOrder(ctx, orderId);

  if (!order) {
    return null;
  }

  order.status = params?.status ?? order.status;

  return await ctx.db.getRepository(OrderEntity).save(order);
}
