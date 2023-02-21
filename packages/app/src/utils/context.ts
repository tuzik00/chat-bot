import { TelegramUserType } from '../types/telegramUser';

export const getCtxUserInfoFromChat = (ctx): TelegramUserType | null => {
  return ctx?.update?.message?.from ?? null;
}

export const getCtxUserInfoFromUpdateMessage = (ctx): TelegramUserType | null => {
  return ctx?.update?.callback_query?.from ?? null;
}

export const getCtxUserInfoFromCallbackQuery = (ctx): TelegramUserType | null => {
  return ctx?.update?.callback_query?.from ?? null;
}

export const getCtxUserInfo = (ctx) => {
  if (getCtxUserInfoFromChat(ctx)) {
    return getCtxUserInfoFromChat(ctx);
  }

  if (getCtxUserInfoFromUpdateMessage(ctx)) {
    return getCtxUserInfoFromUpdateMessage(ctx);
  }

  if (getCtxUserInfoFromCallbackQuery(ctx)) {
    return getCtxUserInfoFromCallbackQuery(ctx);
  }

  return null;
}

export const getCtxChatId = (ctx) => {
  return ctx?.update?.message?.chat?.id ?? null;
}
