export const offSetAndLimit = async (ctx, next) => {
  ctx.query.offset = Number(ctx.query.offset) || 0
  ctx.query.limit = Number(ctx.query.limit) || 30

  await next()
}

const MemorySession = {}
export const sessionMiddleWare = (ctx, next) => {
  console.log(JSON.stringify(ctx.request.body))
  if (ctx.request.body.edited_message) {
    ctx.body = ''
    return
  }

  let chatId = ''
  let user = {}
  if (ctx.request.body.callback_query) {
    chatId = ctx.request.body.callback_query.message.chat.id
    user = ctx.request.body.callback_query.from
  } else {
    chatId = ctx.request.body.message.chat.id
    user = ctx.request.body.message.from
  }

  if (!MemorySession[chatId]) MemorySession[chatId] = {}
  if (!MemorySession[chatId][user.id]) MemorySession[chatId][user.id] = { user }

  ctx.session = MemorySession[chatId][user.id]
  next()
}

export default offSetAndLimit
