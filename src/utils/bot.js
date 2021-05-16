import { Telegraf, Markup } from 'telegraf'
import moment from 'moment'

const bot = new Telegraf(process.env.TG_TOKEN)
bot.telegram.setWebhook(`${process.env.URL}/bot`)

const HRCheckInOrOut = (ctx, type = 'IN') => {
  const now = moment()
  const groupChatId = -566259430
  let msg1 = ''
  let msg2 = ''
  let action = ''

  switch (type) {
    case 'OUT':
      msg1 = '18:30 下班打卡'
      msg2 = '下班'
      action = 'EMCheckOut'
      break

    case 'IN':
    default:
      msg1 = '09:30 ~ 10:30 上班打卡'
      msg2 = '上班'
      action = 'EMCheckIn'
      break
  }

  bot.telegram.sendMessage(groupChatId,
    `
${now.format('MM/DD')} ${msg1}開始囉
按下 \`我要打卡\` 完成與機器人私聊問題後 即可完成打卡
    `, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.callback('我要打卡', action),
      ]),
    })

  ctx.editMessageText(`${ctx.callbackQuery.message.text} \n已發起${msg2}打卡`)
}

const EMCheckInOrOut = (ctx) => {
  bot.telegram.sendMessage(ctx.callbackQuery.from.id, '請輸入你的打卡時間')
  ctx.answerCbQuery('請至bot私人訊息完成打卡')
}

bot.on('text', async (ctx) => {
  const now = moment()

  if (/我是(\+7|apple)大美女/.test(ctx.message.text)) {
    ctx.reply(`
嗯嗯好的 ${ctx.message.text.match(/我是(\+7|apple)大美女/)[1]} 你這次想要幹嘛呢
    `, Markup.inlineKeyboard([
      Markup.button.callback(`發起${now.format('MM/DD')}上班打卡`, 'HRCheckIn'),
      Markup.button.callback(`發起${now.format('MM/DD')}下班打卡`, 'HRCheckOut'),
      Markup.button.callback('匯出CSV', 'HRExportCSV'),
    ]))
  }
})

bot.action('HRCheckIn', (ctx) => {
  HRCheckInOrOut(ctx, 'IN')
})
bot.action('HRCheckOut', (ctx) => {
  HRCheckInOrOut(ctx, 'OUT')
})
bot.action('HRExportCSV', (ctx) => {
  ctx.editMessageText(`${ctx.callbackQuery.message.text} \n這功能還沒好喔 呵呵`)
})

bot.action('EMCheckIn', (ctx) => {
  EMCheckInOrOut(ctx)
})
bot.action('EMCheckOut', (ctx) => {
  EMCheckInOrOut(ctx)
})

export default bot
