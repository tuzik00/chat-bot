export const getChatMember = async (ctx) => {
  const telegramId = ctx?.user?.telegramId;

  if (!telegramId) {
    return null;
  }

  return await ctx.telegram.getChatMember(process.env.CHAT_ID, telegramId);
};

export const isChatMemberSubscribe = async (ctx) => {
  const chatMember = await getChatMember(ctx);

  if (!chatMember) {
    return false;
  }

  return chatMember.status !== 'left'
}
