import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class UtilService implements OnModuleInit {
  constructor(@InjectBot() private readonly Bot: Telegraf) {}

  async onModuleInit() {
    await this.Bot.telegram.setMyCommands([
      { command: '/start', description: 'Botni boshlash' },
      { command: '/dacha', description: "Dachaga o'tish" },
      { command: '/info', description: "O'zingiz haqingizda ma'lumot" },
      { command: '/help', description: 'Yordam olish' },
    ]);
  }
}
