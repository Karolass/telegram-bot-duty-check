const { Telegraf } = require('telegraf')

const bot = new Telegraf('1877028977:AAHTzCaxLrRyzCqngwyilzfKKQNrc5zja3c')
bot.telegram.setWebhook('https://wise-earwig-84.loca.lt/bot')

bot.on('text', (ctx) => {
  // Explicit usage
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  ctx.reply(`Hello ${ctx.state.role}`)
})

bot.launch()
