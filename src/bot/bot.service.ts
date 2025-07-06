import { Injectable } from '@nestjs/common';
import { IMyContext } from 'src/helpers/bot.sessin';
import { PrismaService } from 'src/prisma/prisma.service';
import { Markup } from 'telegraf';

@Injectable()
export class BotService {
  onAdmineditDacha(ctx: IMyContext) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async onStartAdmin(ctx: IMyContext) {
    try {
      ctx.session.stepAdmin = 'Asosiy';
      ctx.reply(
        `Siz asosiy sahifadasiz`,
        Markup.keyboard([
          ['Reyting', 'Kunlik foydalanuvchilar', 'Menyu'],
        ]).resize(),
      );
    } catch (error) {
      ctx.reply('❌ Xatolik yuz berdi');
      return;
    }
  }

  async onAdmineditDach(ctx: IMyContext) {
    try {
      ctx.session.data = null;
      ctx.session.id = null;
      ctx.session.image = null;
      ctx.session.description = null;
      await ctx.reply(
        'Mahsulodlarni boshqarish',
        Markup.inlineKeyboard([
          [Markup.button.callback(`Dachalarni ko'rish`, `findAll`)],
          [Markup.button.callback(`Yangi Dacha qo'shish`, `Create`)],
          [Markup.button.callback(`Dachalarni o'chirish`, `Delete`)],
          [Markup.button.callback(`Bugun qoshilgan Dachalar`, 'Bugun')],
        ]),
      );
    } catch (error) {
      ctx.reply('❌ Xatolik yuz berdi');
      return;
    }
  }

  async onStart(ctx: IMyContext) {
    ctx.session.data = null;
    ctx.session.id = null;
    ctx.session.image = null;
    ctx.session.description = null;
    try {
      const user = await this.prisma.user.findFirst({
        where: { chat_id: ctx.from?.id },
      });
      if (!user) {
        await this.prisma.user.create({
          data: {
            first_name: ctx.from?.first_name,
            chat_id: ctx.from?.id,
            is_bot: ctx.from?.is_bot,
          },
        });
      }
      ctx.session.stepUser = 'menyu';
      await ctx.reply(
        `Botga hush kelibsiz ${ctx.from?.first_name || 'Hurmatli foydalanuvchi'}`,
        Markup.keyboard([
          ['📊 reyting qoldirish', `🏕️ Dachalarn ko'rish`, '🙋🏼‍♂️ Help'],
        ]).resize(),
      );
    } catch (error) {
      await ctx.reply("❌ Xatolik yuz berdi?  keyinroq urinib qo'ying");
    }
  }

  async create(ctx: IMyContext) {
    try {
      await ctx.reply('Dacha nomini kiriting: ');
      ctx.session.name = 'name';
    } catch (error) {
      await ctx.reply('❌ Xatolik yuz berdi');
      return;
    }
  }
  async Kunlik(ctx: IMyContext) {
    try {
      const kunlikFoydalanuvchilar = await this.prisma.reyting.findMany({
        select: {
          user_id: true,
        },
        distinct: ['user_id'],
      });

      const soni = kunlikFoydalanuvchilar.length;

      ctx.reply(`📊 Bugungi foydalanuvchilar soni: ${soni} ta`);
      return;
    } catch (error) {
      ctx.reply(`❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.`);
      return;
    }
  }

  //******************************  USER  ************************/

  async onUserAllDacha(ctx: IMyContext) {
    ctx.session.id = null;
    ctx.session.image = null;
    ctx.session.description = null;
    try {
      const dachalar = await this.prisma.dacha.findMany({
        orderBy: { id: 'asc' },
      });

      if (!dachalar.length) {
        ctx.reply('🛑 Hozircha xech qanday dacha mavjud emas.');
        return;
      }

      const buttonlar = dachalar.map((dacha) => [
        Markup.button.callback(
          dacha.name!,
          `dacha:${dacha.name!.toLowerCase()}`,
        ),
      ]);

      buttonlar.push([Markup.button.callback('Ortga', 'ortga')]);

      await ctx.reply(
        `Ushbu dacha birini tanlang 👇`,
        Markup.inlineKeyboard(buttonlar),
      );
    } catch (error) {
      console.error(error);
      ctx.reply(`❌ Xatolik yuz berdi. Qaytadan urinib ko'ring.`);
      return;
    }
  }

  async onhelp(ctx: IMyContext) {
    ctx.session.id = null;
    ctx.session.image = null;
    ctx.session.description = null;
    await ctx.reply(
      `📋 <b>Yordam bo'limi</b>\n
    Assalomu alaykum! ${ctx.from?.first_name || 'Hurmatli foydalanuvchi'}   Bu bot orqali siz damolish maskanlribilan  tanishishingiz va ularga baho berishingiz mumkin.\n
    🧾 <b>Bot imkoniyatlari:</b>
    
    🏕️ <b>Dachalar ro'yxati</b> - mavjud barcha dachalarni rasm, narx va tavsifi bilan ko'rishingiz mumkin.
    
    ⭐️ <b>Reyting berish</b> - har bir taomga 1 dan 5 gacha baho berishingiz mumkin.
    
    🏆 <b>Eng yuqori baholangan Dacha</b> - foydalanuvchilar tomonidan eng ko'p baholangan Dachani ko'rishingiz mumkin.
    
    ❓ <b>Yordam</b> - ushbu bo'lim orqali botdan qanday foydalanishni bilib olasiz.
    
    Agar sizda savollar bo'lsa, admin bilan bog'laning: @sherzodbek311
    
    `,
      { parse_mode: 'HTML' },
    );
  }

  async OnHelp(ctx: IMyContext) {
    ctx.session.data = null;
    ctx.session.id = null;
    ctx.session.image = null;
    ctx.session.description = null;
    await ctx.reply(
       `📋 <b>Yordam bo'limi</b>\n
    Assalomu alaykum! ${ctx.from?.first_name || 'Hurmatli foydalanuvchi'}   Bu bot orqali siz damolish maskanlribilan  tanishishingiz va ularga baho berishingiz mumkin.\n
    🧾 <b>Bot imkoniyatlari:</b>
    
    🏕️ <b>Dachalar ro'yxati</b> - mavjud barcha dachalarni rasm, narx va tavsifi bilan ko'rishingiz mumkin.
    
    ⭐️ <b>Reyting berish</b> - har bir taomga 1 dan 5 gacha baho berishingiz mumkin.
    
    🏆 <b>Eng yuqori baholangan Dacha</b> - foydalanuvchilar tomonidan eng ko'p baholangan Dachani ko'rishingiz mumkin.
    
    ❓ <b>Yordam</b> - ushbu bo'lim orqali botdan qanday foydalanishni bilib olasiz.
    
    Agar sizda savollar bo'lsa, admin bilan bog'laning: @sherzodbek311
    
    `,
      { parse_mode: 'HTML' },
    );
  }

  async onOrtga(ctx: IMyContext) {
    try {
      if (ctx.session.stepUser == 'menyu') {
        await ctx.reply(
          `Siz menyu oynasidasiz`,
          Markup.keyboard([
            ['📊 reyting qoldirish', `🏕️ Dachalarn ko'rish`, '🙋🏼‍♂️ Help'],
          ]).resize(),
        );
        return;
      }
      if (ctx.session.stepUser == 'reyting') {
        await ctx.reply(
          `Siz menyu oynasiga o'tdingiz`,
          Markup.keyboard([
            ['📊 reyting qoldirish', `🏕️ Dachalarn ko'rish`, '🙋🏼‍♂️ Help'],
          ]).resize(),
        );
        return;
      }
      if ((ctx.session.stepUser = 'Tavom')) {
        return this.onUserAllDacha(ctx);
      }
    } catch (error) {
      ctx.reply("❌ Xatolik yuz berdi?  Keyinrok urinib ko'ring");
    }
  }

  async onreyting(ctx: IMyContext) {
    try {
      ctx.session.stepUser = 'reyting';
      const dachalar = await this.prisma.dacha.findMany({
        orderBy: { avg_reytig: 'desc' },
      });

      if (!dachalar.length) {
        await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
        return;
      }

      for (const item of dachalar) {
        const caption = `🏕️ <b>${item.name}</b>\n\n💰 Narxi: ${item.price} so'm\n\n📝 Tavsif: ${item.description}\n\n📈 reyting: ${item.avg_reytig}\n\n🆔 ID: ${item.id}`;

        if (item.image) {
          await ctx.replyWithPhoto(item.image, {
            caption,
            parse_mode: 'HTML',
          });
        } else {
          await ctx.reply(caption, { parse_mode: 'HTML' });
        }
      }
    } catch (error) {
      await ctx.reply("❌ Xatolik yuz berdi?  Keyinroq urinib ko'ring.");
    }
    return;
  }
  async onInfo(ctx: IMyContext) {
    ctx.session.id = null;
    ctx.session.image = null;
    ctx.session.description = null;
    try {
      ctx.reply(
        `👤 <b>Foydalanuvchi ma'lumotlari</b>\n\n` +
          `📛 <b>Username:</b> @${ctx.from?.username || `Noma'lum`}\n` +
          `🧍 <b>Ismi:</b> ${ctx.from?.first_name || `Noma'lum`}\n` +
          `🧍‍♂️ <b>Familiyasi:</b> ${ctx.from?.last_name || `Yo'q`}\n` +
          `🆔 <b>Chat ID:</b> ${ctx.from?.id}\n` +
          `🌐 <b>Til kodi:</b> ${ctx.from?.language_code || `Noma'lum`}\n` +
          `💎 <b>Premium foydalanuvchi:</b> ${ctx.from?.is_premium ? 'Ha' : `Yo'q`}\n` +
          `🤖 <b>Botmi:</b> ${ctx.from?.is_bot ? 'Ha' : `Yo'q`}`,
        { parse_mode: 'HTML' },
      );
    } catch (error) {
      ctx.reply('❌ Xatolik yuz berdi');
    }
  }
  async textmessage(ctx: IMyContext) {
    ctx.session.data ??= {};

    if (
      ctx.session.name === 'name' &&
      ctx.message &&
      'text' in ctx.message &&
      typeof ctx.message.text === 'string'
    ) {
      ctx.session.data.name = ctx.message.text;
      ctx.session.name = null;
      ctx.session.price = 'price';
      await ctx.reply(
        'Davom etamiz...',
        Markup.keyboard([['Ortga']])
          .resize()
          .persistent(),
      );
      await ctx.reply('📥 Mahsulot narxini kiriting:');
      return;
    }

    if (
      ctx.session.price === 'price' &&
      ctx.message &&
      'text' in ctx.message &&
      typeof ctx.message.text === 'string'
    ) {
      const price = parseInt(ctx.message.text);
      if (isNaN(price)) {
        await ctx.reply('❌ Iltimos, faqat raqam kiriting!');
        return;
      }
      ctx.session.data.price = price;
      ctx.session.price = null;
      ctx.session.description = 'description';
      await ctx.reply(
        'Davom etamiz...',
        Markup.keyboard([['Ortga']])
          .resize()
          .persistent(),
      );
      await ctx.reply('📥 dacha haqida tavsif kiriting:');
      return;
    }

    if (
      ctx.session.description === 'description' &&
      ctx.message &&
      'text' in ctx.message &&
      typeof ctx.message.text === 'string'
    ) {
      ctx.session.data.description = ctx.message.text;
      ctx.session.description = null;
      ctx.session.image = 'img';
      await ctx.reply(
        'Davom etamiz...',
        Markup.keyboard([['Ortga']])
          .resize()
          .persistent(),
      );
      await ctx.reply('📸 Dacha rasmini yuboring:');
      return;
    }
    if (ctx.session.image == 'img') {
      await ctx.reply(
        'Davom etamiz...',
        Markup.keyboard([['Ortga']])
          .resize()
          .persistent(),
      );
      await ctx.reply('📸 Dacha rasmini yuboring:');
      return;
    }
  }
  async OnPhoto(ctx: IMyContext) {
    ctx.session.data ??= {};

    if (ctx.session.image === 'img' && ctx.message && 'photo' in ctx.message) {
      const photos = ctx.message.photo;
      const bestPhoto = photos[photos.length - 1];
      const fileId = bestPhoto.file_id;

      ctx.session.data.image = fileId;

      const { name, price, description, image } = ctx.session.data;

      if (name && price && description && image) {
        await ctx.replyWithPhoto(image, {
          caption: `📝 Ma'lumotlar:\n🏕️ <b>${name}</b>\n💰 ${price} so'm\n📄 ${description}\n\n✅ Saqlashni xohlaysizmi?`,
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('✅ Saqlash', 'save_menu')],
            [Markup.button.callback('🔙 Bekor qilish', 'cancel_save')],
          ]),
        });
        return;
      } else {
        await ctx.reply("❌ Ma'lumotlar to'liq emas!");
        return;
      }
    }

    ctx.session.data = null;
    ctx.session.image = null;
    return;
  }

  async findAll(ctx: IMyContext) {
    try {
      const dachalar = await this.prisma.dacha.findMany({
        orderBy: { avg_reytig: 'desc' },
      });

      if (!dachalar.length) {
        await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
        return;
      }

      for (const item of dachalar) {
        const caption = `🏕️ <b>${item.name}</b>\n\n💰 Narxi: ${item.price} so'm\n\n📝 Tavsif: ${item.description}\n\n📈 reyting: ${item.avg_reytig}\n\n🆔 ID: ${item.id}`;

        if (item.image) {
          await ctx.replyWithPhoto(item.image, {
            caption,
            parse_mode: 'HTML',
          });
        } else {
          await ctx.reply(caption, { parse_mode: 'HTML' });
        }
      }
      await ctx.reply(
        "📢 <b>Bugungi reyting g'oliblari yuqorida joylashgan!</b>",
        { parse_mode: 'HTML' },
      );
    } catch (error) {
      await ctx.reply(
        "❗️ Xatolik yuz berdi?  Keyinroq urinib ko'ring.",
        Markup.keyboard([['Orqaga qaytish']])
          .resize()
          .oneTime(),
      );
    }
    return;
  }

  async Bugun(ctx: IMyContext) {
    try {
      const dachalar = await this.prisma.dacha.findMany();

      if (!dachalar.length) {
        await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
        return;
      }
      ctx.session.stepAdmin = 'bugun';
      ctx.session.SS = 'ss';
      const buttons = dachalar.map((dacha) => [
        Markup.button.callback(dacha.name || 'Nomalum', `bugun:${dacha.id}`),
      ]);

      await ctx.reply(
        '📃 Bugun qushlgan Dachalarni tanlayng:',
        Markup.inlineKeyboard(
          dachalar.map((dacha) => [
            Markup.button.callback(
              dacha.name?.trim() ? dacha.name : `ID:${dacha.id}`,
              `bugun:${dacha.id}`,
            ),
          ]),
        ),
      );
      ctx.answerCbQuery();
      ctx.reply(
        'Menyu',
        Markup.keyboard([
          ['✅ Saqlash', 'Ortga'],
          ['💎 Saralangan Dachalar', "🗑 O'chirish"],
        ]).resize(),
      );
    } catch (error) {
      ctx.reply("❌ Xatolik yuz berdi? Keyinroq urinib ko'ring.");
      return;
    }
  }

  async Saqlash(ctx: IMyContext) {
    try {
      const mavjudlar = await this.prisma.bugun.findMany();
      const mavjudIds = new Set(mavjudlar.map((i) => i.dachaId));
      const sessiyaDachalar = ctx.session.dacha || [];
      const yangiDachalar = sessiyaDachalar.filter((id) => !mavjudIds.has(id));

      if (yangiDachalar.length > 0) {
        await Promise.all(
          yangiDachalar.map((id) =>
            this.prisma.bugun.create({ data: { dachaId: id } }),
          ),
        );
        ctx.session.dacha = [];
        ctx.reply("✅ Yangi ma'lumotlar saqlandi 🎉");
      } else {
        ctx.reply('ℹ️ Bu dacha allaqachon tanlangan!');
      }
    } catch (error) {
      console.error(error);
      ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.");
    }
  }

  async delet(ctx: IMyContext) {
    try {
      const dachalar = await this.prisma.dacha.findMany();

      if (!dachalar.length) {
        await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
        return;
      }

      const buttons = dachalar.map((dacha) => [
        Markup.button.callback(dacha.name || 'Nomalum', `del:${dacha.id}`),
      ]);

      await ctx.answerCbQuery();
      await ctx.reply(
        "🗑 O'chirmoqchi bo'lgan dacha tanlang:",
        Markup.inlineKeyboard(
          dachalar.map((dacha) => [
            Markup.button.callback(
              dacha.name?.trim() ? dacha.name : `ID:${dacha.id}`,
              `del:${dacha.id}`,
            ),
          ]),
        ),
      );
    } catch (error) {
      ctx.reply("❌ Xatolik yuz berdi? Keyinroq urinib ko'ring.");
      return;
    }
  }

  async sendReytingPrompt(ctx: IMyContext, menuName: string) {
    await ctx.answerCbQuery();

    await ctx.reply(
      `🏕️ Siz <b>${menuName}</b> Dacha tanladingiz.\nReyting bering (1-5):`,
      {
        parse_mode: 'HTML',
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback('1', 'reyting:1'),
            Markup.button.callback('2', 'reyting:2'),
            Markup.button.callback('3', 'reyting:3'),
            Markup.button.callback('4', 'reyting:4'),
            Markup.button.callback('5', 'reyting:5'),
          ],
        ]).reply_markup,
      },
    );
  }

  async saralanganlar(ctx: IMyContext) {
    try {
      const bugungiDachalar = await this.prisma.bugun.findMany();

      if (!bugungiDachalar.length) {
        await ctx.reply('🤷‍♂️ Bugun uchun hech qanday dacha tanlanmagan.');
        return;
      }

      const dachaIds = bugungiDachalar.map((item) => item.dachaId);

      const dachalar = await this.prisma.dacha.findMany({
        where: { id: { in: dachaIds } },
      });

      if (!dachalar.length) {
        await ctx.reply('🛑 Tanlangan dachalar topilmadi.');
        return;
      }

      const buttons = dachalar.map((dacha) => [
        Markup.button.callback(
          `🗑 ${dacha.name || "Noma'lum"}`,
          `UU:${dacha.id}`,
        ),
      ]);

      await ctx.reply(
        "🗑 O'chirish uchun saralangan dacha tanlang:",
        Markup.inlineKeyboard(buttons),
      );
    } catch (error) {
      console.error(error);
      await ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.");
    }
  }
}
