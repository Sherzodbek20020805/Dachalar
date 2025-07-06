"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const telegraf_1 = require("telegraf");
let BotService = class BotService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onStartAdmin(ctx) {
        try {
            ctx.session.stepAdmin = 'Asosiy';
            ctx.reply(`Siz asosiy sahifadasiz`, telegraf_1.Markup.keyboard([
                ['Reyting', 'Kunlik foydalanuvchilar', 'Menyu'],
            ]).resize());
        }
        catch (error) {
            ctx.reply('❌ Xatolik yuz berdi');
            return;
        }
    }
    async onAdmineditMenyu(ctx) {
        try {
            ctx.session.data = null;
            ctx.session.id = null;
            ctx.session.image = null;
            ctx.session.description = null;
            await ctx.reply('Mahsulodlarni boshqarish', telegraf_1.Markup.inlineKeyboard([
                [telegraf_1.Markup.button.callback(`Dachalarni ko'rish`, `findAll`)],
                [telegraf_1.Markup.button.callback(`Yangi Ovqat qo'shish`, `Create`)],
                [telegraf_1.Markup.button.callback(`Dachalarni o'chirish`, `Delete`)],
                [telegraf_1.Markup.button.callback(`Bugun qoshilgan Dachalar`, "Bugun")]
            ]));
        }
        catch (error) {
            ctx.reply('❌ Xatolik yuz berdi');
            return;
        }
    }
    async onStart(ctx) {
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
            await ctx.reply(`Botga hush kelibsiz ${ctx.from?.first_name || 'Hurmatli foydalanuvchi'}`, telegraf_1.Markup.keyboard([
                ['📊 reyting qoldirish', `🏕️ Dachalarn ko'rish`, '🙋🏼‍♂️ Help'],
            ]).resize());
        }
        catch (error) {
            await ctx.reply("❌ Xatolik yuz berdi?  keyinroq urinib qo'ying");
        }
    }
    async create(ctx) {
        try {
            await ctx.reply('Mahsulot nomini kiriting: ');
            ctx.session.name = 'name';
        }
        catch (error) {
            await ctx.reply('❌ Xatolik yuz berdi');
            return;
        }
    }
    async Kunlik(ctx) {
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
        }
        catch (error) {
            ctx.reply(`❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.`);
            return;
        }
    }
    async onUserAllMenyu(ctx) {
        ctx.session.id = null;
        ctx.session.image = null;
        ctx.session.description = null;
        try {
            const menyular = await this.prisma.menyu.findMany({
                orderBy: { id: 'asc' },
            });
            if (!menyular.length) {
                ctx.reply('🛑 Hozircha xech qanday menyu mavjud eman.');
                return;
            }
            const buttonlar = menyular.map((menu) => [
                telegraf_1.Markup.button.callback(menu.name, `menu:${menu.name.toLowerCase()}`),
            ]);
            buttonlar.push([telegraf_1.Markup.button.callback('Ortga', 'ortga')]);
            await ctx.reply(`Ushbu menyulardan birini tanlang 👇`, telegraf_1.Markup.inlineKeyboard(buttonlar));
        }
        catch (error) {
            console.error(error);
            ctx.reply(`❌ Xatolik yuz berdi. Qaytadan urinib ko'ring.`);
            return;
        }
    }
    async onhelp(ctx) {
        ctx.session.id = null;
        ctx.session.image = null;
        ctx.session.description = null;
        await ctx.reply(`📋 <b>Yordam bo'limi</b>\n
    Assalomu alaykum! ${ctx.from?.first_name || 'Hurmatli foydalanuvchi'}   Bu bot orqali siz damolish maskanlribilan  tanishishingiz va ularga baho berishingiz mumkin.\n
    🧾 <b>Bot imkoniyatlari:</b>
    
    🍽 <b>Dachalar ro'yxati</b> - mavjud barcha dachalarni rasm, narx va tavsifi bilan ko'rishingiz mumkin.
    
    ⭐️ <b>Reyting berish</b> - har bir taomga 1 dan 5 gacha baho berishingiz mumkin.
    
    🏆 <b>Eng yuqori baholangan Dacha</b> - foydalanuvchilar tomonidan eng ko'p baholangan Dachani ko'rishingiz mumkin.
    
    ❓ <b>Yordam</b> - ushbu bo'lim orqali botdan qanday foydalanishni bilib olasiz.
    
    Agar sizda savollar bo'lsa, admin bilan bog'laning: @sherzodbek311 Yoki  @lm_faxa
    
    `, { parse_mode: 'HTML' });
    }
    async OnHelp(ctx) {
        ctx.session.data = null;
        ctx.session.id = null;
        ctx.session.image = null;
        ctx.session.description = null;
        await ctx.reply(`📋 <b>Admin Yordam Bo'limi</b>\n
    Assalomu alaykum, ${ctx.from?.first_name || 'Hurmatli foydalanuvchi'}!\n
    Siz admin sifatida quyidagi imkoniyatlarga egasiz:
    
    👨‍🍳 <b>Yangi ovqat qo'shish:</b> menyuga yangi Dacha, ularning nomi, narxi, tavsifi va rasm bilan qo'shishingiz mumkin.
    
    🗑 <b>Ovqatni o'chirish:</b> mavjud menyudan istalgan taomni o'chirishingiz mumkin.
    
    📋 <b>Menyu ro'yxatini ko'rish:</b> barcha mavjud Dachani to'liq ro'yxati bilan ko'rishingiz mumkin.
    
    📊 <b>Reyting statistikasi:</b> foydalanuvchilar tomonidan eng ko'p baho berilgan Dachani ko'rib, oshxonada shu taomni tayyorlash haqida qaror qabul qilishingiz mumkin.
    
    🛠 <b>To'liq nazorat:</b> foydalanuvchilar faoliyati, reytinglar va Dacha haqida umumiy nazoratga egasiz.
    
    Agar sizga texnik yordam kerak bo'lsa yoki muammo yuzaga kelsa, quyidagi kontakt orqali bog'laning: @Abduhamid_1852 Yoki @lm_faxa
    `, { parse_mode: 'HTML' });
    }
    async onOrtga(ctx) {
        try {
            if (ctx.session.stepUser == 'menyu') {
                await ctx.reply(`Siz menyu oynasidasiz`, telegraf_1.Markup.keyboard([
                    ['📊 reyting qoldirish', `🏕️ Dachalarn ko'rish`, "🙋🏼‍♂️ Help"],
                ]).resize());
                return;
            }
            if (ctx.session.stepUser == 'reyting') {
                await ctx.reply(`Siz menyu oynasiga o'tdingiz`, telegraf_1.Markup.keyboard([
                    ['📊 reyting qoldirish', `🏕️ Dachalarn ko'rish`, "🙋🏼‍♂️ Help"],
                ]).resize());
                return;
            }
            if ((ctx.session.stepUser = 'Tavom')) {
                return this.onUserAllMenyu(ctx);
            }
        }
        catch (error) {
            ctx.reply("❌ Xatolik yuz berdi?  Keyinrok urinib ko'ring");
        }
    }
    async onreyting(ctx) {
        try {
            ctx.session.stepUser = 'reyting';
            const menyular = await this.prisma.menyu.findMany({
                orderBy: { avg_reytig: 'desc' },
            });
            if (!menyular.length) {
                await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
                return;
            }
            for (const item of menyular) {
                const caption = `🍽 <b>${item.name}</b>\n\n💰 Narxi: ${item.price} so'm\n\n📝 Tavsif: ${item.description}\n\n📈 reyting: ${item.avg_reytig}\n\n🆔 ID: ${item.id}`;
                if (item.image) {
                    await ctx.replyWithPhoto(item.image, {
                        caption,
                        parse_mode: 'HTML',
                    });
                }
                else {
                    await ctx.reply(caption, { parse_mode: 'HTML' });
                }
            }
        }
        catch (error) {
            await ctx.reply("❌ Xatolik yuz berdi?  Keyinroq urinib ko'ring.");
        }
        return;
    }
    async onInfo(ctx) {
        ctx.session.id = null;
        ctx.session.image = null;
        ctx.session.description = null;
        try {
            ctx.reply(`👤 <b>Foydalanuvchi ma'lumotlari</b>\n\n` +
                `📛 <b>Username:</b> @${ctx.from?.username || `Noma'lum`}\n` +
                `🧍 <b>Ismi:</b> ${ctx.from?.first_name || `Noma'lum`}\n` +
                `🧍‍♂️ <b>Familiyasi:</b> ${ctx.from?.last_name || `Yo'q`}\n` +
                `🆔 <b>Chat ID:</b> ${ctx.from?.id}\n` +
                `🌐 <b>Til kodi:</b> ${ctx.from?.language_code || `Noma'lum`}\n` +
                `💎 <b>Premium foydalanuvchi:</b> ${ctx.from?.is_premium ? 'Ha' : `Yo'q`}\n` +
                `🤖 <b>Botmi:</b> ${ctx.from?.is_bot ? 'Ha' : `Yo'q`}`, { parse_mode: 'HTML' });
        }
        catch (error) {
            ctx.reply('❌ Xatolik yuz berdi');
        }
    }
    async textmessage(ctx) {
        ctx.session.data ??= {};
        if (ctx.session.name === 'name' &&
            ctx.message &&
            'text' in ctx.message &&
            typeof ctx.message.text === 'string') {
            ctx.session.data.name = ctx.message.text;
            ctx.session.name = null;
            ctx.session.price = 'price';
            await ctx.reply('Davom etamiz...', telegraf_1.Markup.keyboard([['Ortga']])
                .resize()
                .persistent());
            await ctx.reply('📥 Mahsulot narxini kiriting:');
            return;
        }
        if (ctx.session.price === 'price' &&
            ctx.message &&
            'text' in ctx.message &&
            typeof ctx.message.text === 'string') {
            const price = parseInt(ctx.message.text);
            if (isNaN(price)) {
                await ctx.reply('❌ Iltimos, faqat raqam kiriting!');
                return;
            }
            ctx.session.data.price = price;
            ctx.session.price = null;
            ctx.session.description = 'description';
            await ctx.reply('Davom etamiz...', telegraf_1.Markup.keyboard([['Ortga']])
                .resize()
                .persistent());
            await ctx.reply('📥 dacha haqida tavsif kiriting:');
            return;
        }
        if (ctx.session.description === 'description' &&
            ctx.message &&
            'text' in ctx.message &&
            typeof ctx.message.text === 'string') {
            ctx.session.data.description = ctx.message.text;
            ctx.session.description = null;
            ctx.session.image = 'img';
            await ctx.reply('Davom etamiz...', telegraf_1.Markup.keyboard([['Ortga']])
                .resize()
                .persistent());
            await ctx.reply('📸 Dacha rasmini yuboring:');
            return;
        }
        if (ctx.session.image == 'img') {
            await ctx.reply('Davom etamiz...', telegraf_1.Markup.keyboard([['Ortga']])
                .resize()
                .persistent());
            await ctx.reply('📸 Dacha rasmini yuboring:');
            return;
        }
    }
    async OnPhoto(ctx) {
        ctx.session.data ??= {};
        if (ctx.session.image === 'img' && ctx.message && 'photo' in ctx.message) {
            const photos = ctx.message.photo;
            const bestPhoto = photos[photos.length - 1];
            const fileId = bestPhoto.file_id;
            ctx.session.data.image = fileId;
            const { name, price, description, image } = ctx.session.data;
            if (name && price && description && image) {
                await ctx.replyWithPhoto(image, {
                    caption: `📝 Ma'lumotlar:\n🍽 <b>${name}</b>\n💰 ${price} so'm\n📄 ${description}\n\n✅ Saqlashni xohlaysizmi?`,
                    parse_mode: 'HTML',
                    ...telegraf_1.Markup.inlineKeyboard([
                        [telegraf_1.Markup.button.callback('✅ Saqlash', 'save_menu')],
                        [telegraf_1.Markup.button.callback('🔙 Bekor qilish', 'cancel_save')],
                    ]),
                });
                return;
            }
            else {
                await ctx.reply("❌ Ma'lumotlar to'liq emas!");
                return;
            }
        }
        ctx.session.data = null;
        ctx.session.image = null;
        return;
    }
    async findAll(ctx) {
        try {
            const menyular = await this.prisma.menyu.findMany({
                orderBy: { avg_reytig: 'desc' },
            });
            if (!menyular.length) {
                await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
                return;
            }
            for (const item of menyular) {
                const caption = `🍽 <b>${item.name}</b>\n\n💰 Narxi: ${item.price} so'm\n\n📝 Tavsif: ${item.description}\n\n📈 reyting: ${item.avg_reytig}\n\n🆔 ID: ${item.id}`;
                if (item.image) {
                    await ctx.replyWithPhoto(item.image, {
                        caption,
                        parse_mode: 'HTML',
                    });
                }
                else {
                    await ctx.reply(caption, { parse_mode: 'HTML' });
                }
            }
            await ctx.reply("📢 <b>Bugungi reyting g'oliblari yuqorida joylashgan!</b>", { parse_mode: 'HTML' });
        }
        catch (error) {
            await ctx.reply("❗️ Xatolik yuz berdi?  Keyinroq urinib ko'ring.", telegraf_1.Markup.keyboard([['Orqaga qaytish']])
                .resize()
                .oneTime());
        }
        return;
    }
    async Bugun(ctx) {
        try {
            const menyular = await this.prisma.menyu.findMany();
            if (!menyular.length) {
                await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
                return;
            }
            ctx.session.stepAdmin = "bugun";
            ctx.session.SS = "ss";
            const buttons = menyular.map((menu) => [
                telegraf_1.Markup.button.callback(menu.name || 'Nomalum', `bugun:${menu.id}`),
            ]);
            await ctx.reply("📃 Bugun qushlgan Dachalarni tanlayng:", telegraf_1.Markup.inlineKeyboard(menyular.map((menu) => [
                telegraf_1.Markup.button.callback(menu.name?.trim() ? menu.name : `ID:${menu.id}`, `bugun:${menu.id}`),
            ])));
            ctx.answerCbQuery();
            ctx.reply("Menyu", telegraf_1.Markup.keyboard([["✅ Saqlash", "Ortga"], ["💎 Saralangan Dachalar", "🗑 O'chirish"]
            ]).resize());
        }
        catch (error) {
            ctx.reply("❌ Xatolik yuz berdi? Keyinroq urinib ko'ring.");
            return;
        }
    }
    async Saqlash(ctx) {
        try {
            const mavjudlar = await this.prisma.bugun.findMany();
            const mavjudIds = new Set(mavjudlar.map(i => i.menyuId));
            const sessiyaDachalar = ctx.session.Dachalar || [];
            const yangiDachalar = sessiyaDachalar.filter(id => !mavjudIds.has(id));
            if (yangiDachalar.length > 0) {
                await Promise.all(yangiDachalar.map(id => this.prisma.bugun.create({ data: { menyuId: id } })));
                ctx.session.Dachalar = [];
                ctx.reply("✅ Yangi ma'lumotlar saqlandi 🎉");
            }
            else {
                ctx.reply("ℹ️ Bu ovqat allaqachon tanlangan!");
            }
        }
        catch (error) {
            console.error(error);
            ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.");
        }
    }
    async delet(ctx) {
        try {
            const menyular = await this.prisma.menyu.findMany();
            if (!menyular.length) {
                await ctx.reply('🛑 Hozircha Dachalar mavjud emas.');
                return;
            }
            const buttons = menyular.map((menu) => [
                telegraf_1.Markup.button.callback(menu.name || 'Nomalum', `del:${menu.id}`),
            ]);
            await ctx.answerCbQuery();
            await ctx.reply("🗑 O'chirmoqchi bo'lgan ovqatni tanlang:", telegraf_1.Markup.inlineKeyboard(menyular.map((menu) => [
                telegraf_1.Markup.button.callback(menu.name?.trim() ? menu.name : `ID:${menu.id}`, `del:${menu.id}`),
            ])));
        }
        catch (error) {
            ctx.reply("❌ Xatolik yuz berdi? Keyinroq urinib ko'ring.");
            return;
        }
    }
    async sendReytingPrompt(ctx, menuName) {
        await ctx.answerCbQuery();
        await ctx.reply(`🍽 Siz <b>${menuName}</b> taomini tanladingiz.\nReyting bering (1-5):`, {
            parse_mode: 'HTML',
            reply_markup: telegraf_1.Markup.inlineKeyboard([
                [
                    telegraf_1.Markup.button.callback('1', 'reyting:1'),
                    telegraf_1.Markup.button.callback('2', 'reyting:2'),
                    telegraf_1.Markup.button.callback('3', 'reyting:3'),
                    telegraf_1.Markup.button.callback('4', 'reyting:4'),
                    telegraf_1.Markup.button.callback('5', 'reyting:5'),
                ],
            ]).reply_markup,
        });
    }
    async saralanganlar(ctx) {
        try {
            const bugungiDachalar = await this.prisma.bugun.findMany();
            if (!bugungiDachalar.length) {
                await ctx.reply('🤷‍♂️ Bugun uchun hech qanday dacha tanlanmagan.');
                return;
            }
            const menyuIds = bugungiDachalar.map(item => item.menyuId);
            const menyular = await this.prisma.menyu.findMany({
                where: { id: { in: menyuIds } },
            });
            if (!menyular.length) {
                await ctx.reply("🛑 Tanlangan menyular topilmadi.");
                return;
            }
            const buttons = menyular.map(menu => [
                telegraf_1.Markup.button.callback(`🗑 ${menu.name || 'Noma\'lum'}`, `UU:${menu.id}`)
            ]);
            await ctx.reply("🗑 O'chirish uchun saralangan dacha tanlang:", telegraf_1.Markup.inlineKeyboard(buttons));
        }
        catch (error) {
            console.error(error);
            await ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.");
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BotService);
//# sourceMappingURL=bot.service.js.map