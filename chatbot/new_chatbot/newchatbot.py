from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Hello, I'm chat-bot and who are you? Tell me just your name.")

async def handle_name(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_name = update.message.text
    await update.message.reply_text(f"Nice to meet you, {user_name}.")

async def where_are_you(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("I'm here.")

async def can_i_ask_you(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("No.")

async def what_is_the_day_today(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("A good day!")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "/start - Start a conversation\n"
        "/where - Ask 'Where are you?'\n"
        "/ask - Ask 'Can I ask you something?'\n"
        "/day - Ask 'What is the day today?'\n"
    )

def main() -> None:
    application = Application.builder().token("MY_BOT_TOKEN").build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("where", where_are_you))
    application.add_handler(CommandHandler("ask", can_i_ask_you))
    application.add_handler(CommandHandler("day", what_is_the_day_today))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_name))

    application.run_polling()

if __name__ == "__main__":
    main()