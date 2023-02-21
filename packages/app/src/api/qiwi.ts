import { OrderEntity } from '../entities/Order';

export const createPaymentForm = (ctx, order: OrderEntity) => {
  return ctx.qiwi.createPaymentForm({
    comment: 'Оплатить 100 токенов',
    amount: order.amount,
    currency: order.currency,
    publicKey: process.env.QIWI_P2P_PUBLICK_KEY,
    billId: order.orderId,
    successUrl: `https://${process.env.HTTP_HOST}${process.env.QIWI_P2P_SUCCESS_PATH}?userId=${order.user.id}&orderId=${order.orderId}`,
  });
}
