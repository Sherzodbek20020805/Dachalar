import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModul } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { session } from 'telegraf';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TelegrafModule.forRoot({
      token: String(process.env.BOT_TOKEN),
      middlewares:[session()],
    }),
    BotModul,
    PrismaModule,
    UtilModule,
  ],
})
export class AppModule {}
