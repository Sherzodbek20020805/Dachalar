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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotUpdate = void 0;
const common_1 = require("@nestjs/common");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const bot_service_1 = require("./bot.service");
const prisma_service_1 = require("../prisma/prisma.service");
const telegraf_1 = require("telegraf");
const ChatID_1 = process.env.ChatID_1;
const ChatID_2 = process.env.ChatID_2;
let BotUpdate = class BotUpdate {
    botService;
    prisma;
    constructor(botService, prisma) {
        this.botService = botService;
        this.prisma = prisma;
    }
    onStart(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            return this.botService.onStartAdmin(ctx);
        }
        else {
            return this.botService.onStart(ctx);
        }
    }
    async Asosiy(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'Asosiy';
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, telegraf_1.Markup.keyboard([
                ['Reyting', 'Kunlik foydalanuvchilar', 'dacha'],
            ]).resize());
        }
        else {
            await ctx.reply(`Siz asosiy sahifaga o'tdingiz`, telegraf_1.Markup.keyboard([['reyting qoldirish', `Dachalarni ko'rish`]]).resize());
            return;
        }
    }
    async OnOrqaga(ctx) {
        const asosiydacha = telegraf_1.Markup.keyboard([
            ['Reyting', 'Kunlik foydalanuvchilar', 'dacha'],
        ]).resize();
        if (ctx.session.stepAdmin === 'dacha') {
            ctx.session.stepAdmin = 'Asosiy';
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, asosiydacha);
            return;
        }
        else if (ctx.session.stepAdmin === 'Asosiy') {
            ctx.reply('Siz bosh sahifadasiz');
            return;
        }
        else if (ctx.session.stepAdmin === 'Reyting') {
            ctx.session.stepAdmin = 'Asosiy';
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, asosiydacha);
            return;
        }
        else if (ctx.session.stepAdmin === 'Kunlik_foydalanuvchilar') {
            ctx.session.stepAdmin = 'Asosiy';
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, asosiydacha);
            return;
        }
        else if (ctx.session.stepAdmin === 'bugun') {
            ctx.session.SS = null;
            ctx.session.stepAdmin = 'dacha';
            await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else if (ctx.session.name === 'name') {
            ctx.session.name = null;
            ctx.session.price = null;
            ctx.session.description = null;
            ctx.session.image = null;
            ctx.session.stepAdmin = 'dacha';
            await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else if (ctx.session.price === 'price') {
            ctx.session.price = null;
            ctx.session.name = null;
            ctx.session.description = null;
            ctx.session.image = null;
            return this.botService.create(ctx);
        }
        else if (ctx.session.description === 'description') {
            ctx.session.price = 'price';
            ctx.session.name = null;
            ctx.session.description = null;
            ctx.session.image = null;
            return this.botService.textmessage(ctx);
        }
        else if (ctx.session.image === 'img') {
            ctx.session.price = null;
            ctx.session.name = null;
            ctx.session.description = 'description';
            ctx.session.image = null;
            return this.botService.textmessage(ctx);
        }
        else if (ctx.session.stepAdmin === 'Creyt') {
            ctx.session.stepAdmin = 'dacha';
            await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else if (ctx.session.stepAdmin === 'FindAll') {
            ctx.session.stepAdmin = 'dacha';
            await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else if (ctx.session.stepAdmin === 'Delet') {
            ctx.session.stepAdmin = 'dacha';
            await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else {
            if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
                ctx.session.stepAdmin = 'Asosiy';
                ctx.reply('Uzoq vaqt foydalatilmagani sababli asosiy dachaga qaytildi', asosiydacha);
                return;
            }
            else {
                if (ctx.session.stepUser == 'dacha') {
                    await ctx.reply(`Asosiy dachadasiz`, telegraf_1.Markup.keyboard([
                        ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
                    ]).resize());
                }
                else {
                    ctx.session.stepUser = 'dacha';
                    await ctx.reply(`Uzoq vaqt foydalatilmagani sababli asosiy dachaga qaytildi`, telegraf_1.Markup.keyboard([
                        ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
                    ]).resize());
                }
            }
        }
    }
    async onStartAdmin(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'dacha';
            await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else {
            ctx.reply("Siz admin paneliga o'taolmaysiz");
            return;
        }
    }
    OnReyting(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'Reyting';
            ctx.reply(`Reyting`, telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.findAll(ctx);
        }
    }
    async onDachalar(ctx) {
        ctx.session.stepUser = 'dacha';
        ctx.reply(`dachaylar`, telegraf_1.Markup.keyboard([['🔙 ortga', "🍱 Bugun qoyilgan Dachalar"]]).resize());
        return this.botService.findAll(ctx);
    }
    async onOnqatlar(ctx) {
        try {
            const bugun = await this.prisma.bugun.findMany();
            if (!bugun.length) {
                await ctx.reply('🤷‍♂️ Bugun qoyilgan Dachalar elon qilinmagan!');
                return;
            }
            for (const item of bugun) {
                const dacha = await this.prisma.dacha.findUnique({
                    where: { id: item.dachaId },
                });
                if (!dacha)
                    continue;
                const text = `🏕️ <b>${dacha.name || "Noma'lum dacha"}</b>\n\n` +
                    `⭐ Reyting: ${dacha.avg_reytig ?? 0}\n\n` +
                    `💰 Narxi: ${dacha.price || "Noma'lum"} so'm\n\n` +
                    `📝 ${dacha.description || 'Tavsif mavjud emas.'}\n\n` +
                    `🆔 ID: ${item.id}`;
                if (dacha.image) {
                    await ctx.replyWithPhoto(dacha.image, {
                        caption: text,
                        parse_mode: 'HTML',
                    });
                }
                else {
                    await ctx.reply(text, { parse_mode: 'HTML' });
                }
            }
        }
        catch (error) {
            console.error(error);
            await ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.");
        }
    }
    Kunlik(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'Kunlik_foydalanuvchilar';
            ctx.reply('Kunlik foydalanuvchilar', telegraf_1.Markup.keyboard([['Ortga']]).resize());
            return this.botService.Kunlik(ctx);
        }
        else {
            ctx.reply("🚫 Bunday buyruq mavjud emas");
        }
    }
    ondachae(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'dacha';
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, telegraf_1.Markup.keyboard([
                ['Reyting', 'Kunlik foydalanuvchilar', 'dacha'],
            ]).resize());
            return this.botService.onAdmineditDacha(ctx);
        }
        else {
            ctx.session.stepUser = 'dacha';
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, telegraf_1.Markup.keyboard([
                ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
            ]).resize());
            return this.botService.findAll(ctx);
        }
    }
    onInfo(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.reply(`O'z haqingizda maluot`, telegraf_1.Markup.keyboard([
                ['Reyting', 'Kunlik foydalanuvchilar', 'dacha'],
            ]).resize());
        }
        else {
            ctx.reply(`O'z haqingizda maluot`, telegraf_1.Markup.keyboard([
                ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
            ]).resize());
        }
        return this.botService.onInfo(ctx);
    }
    OnHelp(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.reply(`Yordam bo'limi`, telegraf_1.Markup.keyboard([
                ['Reyting', 'Kunlik foydalanuvchilar', 'dacha'],
            ]).resize());
            return this.botService.OnHelp(ctx);
        }
        else {
            ctx.reply(`Yordam bo'limi`, telegraf_1.Markup.keyboard([
                ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
            ]).resize());
            return this.botService.onhelp(ctx);
        }
    }
    Ortga(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'dacha';
            return this.botService.onAdmineditDacha(ctx);
        }
        else {
            ctx.reply(`Siz asosiy sahifaga o'tdingiz`, telegraf_1.Markup.keyboard([
                ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
            ]).resize());
        }
    }
    OnPhoto(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            return this.botService.OnPhoto(ctx);
        }
        else {
            ctx.reply(`❌ Bu botga rasim yuborib bo'lmaydi`);
            return;
        }
    }
    async createAction(ctx) {
        ctx.answerCbQuery();
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'Creyt';
            await ctx.reply('Tovar', telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']]).resize());
            return this.botService.create(ctx);
        }
        else {
            ctx.reply("Siz admin paneliga o'ta olmaysiz");
            return;
        }
    }
    find_all(ctx) {
        ctx.session.stepAdmin = 'FindAll';
        ctx.reply('Barcha Tavomlar', telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']])
            .resize()
            .oneTime());
        return this.botService.findAll(ctx);
    }
    delet(ctx) {
        ctx.answerCbQuery();
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            ctx.session.stepAdmin = 'Delet';
            ctx.reply("Tavomlarni o'chirish", telegraf_1.Markup.keyboard([['Asosiy sahifa', 'Ortga']])
                .resize()
                .oneTime());
            return this.botService.delet(ctx);
        }
        else {
            ctx.reply("Siz admin paneliga o'ta olmaysiz");
            return;
        }
    }
    async deletedacha(ctx) {
        try {
            const id = parseInt(ctx.match[1]);
            const dacha = await this.prisma.dacha.findUnique({ where: { id } });
            if (!dacha) {
                ctx.reply('❌ Bu dacha topilmadi.');
                return;
            }
            await this.prisma.dacha.delete({ where: { id } });
            await ctx.answerCbQuery();
            await ctx.reply(`✅ ${dacha.name} nomli tavom o'chirildi.`);
        }
        catch (err) {
            await ctx.reply('❌ Xatolik yuz berdi.');
        }
    }
    async deleteBugunDacha(ctx) {
        const id = Number(ctx.match[1]);
        await this.prisma.bugun.deleteMany({
            where: { dachaId: id },
        });
        await ctx.answerCbQuery(`❌ dacha o'chirildi`);
        await ctx.editMessageReplyMarkup(undefined);
    }
    async savedacha(ctx) {
        try {
            const data = ctx.session.data;
            if (!data?.name || !data?.price || !data?.description || !data?.image) {
                ctx.reply(`❌ Saqlash uchun to'liq ma'lumot yo'q!`);
                return;
            }
            const yangi = await this.prisma.dacha.create({ data });
            await ctx.editMessageCaption?.(`✅ Saqlandi!\n🏕️ <b>${data.name}</b>\n💰 ${data.price} so'm\n📝 ${data.description}`, {
                parse_mode: 'HTML',
            });
            ctx.session.data = null;
            ctx.session.image = null;
        }
        catch (error) {
            console.error(error);
            ctx.reply('❌ Xatolik yuz berdi');
            return;
        }
    }
    async cancelSave(ctx) {
        ctx.session.data = null;
        ctx.session.image = null;
        ctx.session.stepAdmin = 'dacha';
        ctx.reply('❌ Saqlash bekor qilindi');
        return this.botService.onAdmineditDacha(ctx);
    }
    async bugun(ctx) {
        ctx.answerCbQuery();
        return this.botService.Bugun(ctx);
    }
    async Bugungi(ctx) {
        if (ctx.session.SS == 'ss') {
            ctx.session.dachalar ??= [];
            ctx.answerCbQuery();
            try {
                let id = parseInt(ctx.match[1]);
                ctx.session.dachalar.push(id);
            }
            catch (error) {
                console.log(error);
                await ctx.reply('❌ Xatolik yuz berdi.');
            }
        }
    }
    Onsaqlash(ctx) {
        ctx.session.dachalar ??= [];
        if (ctx.session.SS == 'ss') {
            ctx.session.SS = null;
            if (ctx.session.dachalar.length !== 0) {
                return this.botService.Saqlash(ctx);
            }
            else {
                ctx.reply('🤷‍♂️ Siz hozircha hech narsa tanlamadingiz');
            }
        }
    }
    async saralangan(ctx) {
        try {
            const bugun = await this.prisma.bugun.findMany();
            if (!bugun.length) {
                await ctx.reply('🤷‍♂️ Bugun qoyilgan Dachalar tanlanmagan!');
                return;
            }
            for (const item of bugun) {
                const dacha = await this.prisma.dacha.findUnique({
                    where: { id: item.dachaId },
                });
                if (!dacha)
                    continue;
                const text = `🏕️ <b>${dacha.name || "Noma'lum dacha"}</b>\n\n` +
                    `⭐ Reyting: ${dacha.avg_reytig ?? 0}\n\n` +
                    `💰 Narxi: ${dacha.price || "Noma'lum"} so'm\n\n` +
                    `📝 ${dacha.description || 'Tavsif mavjud emas.'}\n\n` +
                    `🆔 ID: ${item.id}`;
                if (dacha.image) {
                    await ctx.replyWithPhoto(dacha.image, {
                        caption: text,
                        parse_mode: 'HTML',
                    });
                }
                else {
                    await ctx.reply(text, { parse_mode: 'HTML' });
                }
            }
        }
        catch (error) {
            console.error(error);
            await ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko'ring.");
        }
    }
    Ondelete(ctx) {
        return this.botService.saralanganlar(ctx);
    }
    async onReytingUser(ctx) {
        ctx.session.stepUser = 'reyting';
        await ctx.reply(`dacha`, telegraf_1.Markup.keyboard([['🔙 ortga']]).resize());
        return this.botService.onUserAllDacha(ctx);
    }
    onOrtga(ctx) {
        return this.botService.onOrtga(ctx);
    }
    onHelp(ctx) {
        if (ctx.from?.id == ChatID_1 || ctx.from?.id == ChatID_2) {
            return this.botService.OnHelp(ctx);
        }
        else {
            return this.botService.onhelp(ctx);
        }
    }
    text(ctx) {
        return this.botService.textmessage(ctx);
    }
    async ortgadacha(ctx) {
        await ctx.reply(`Asosiy dachaga o'tdingiz`, telegraf_1.Markup.keyboard([
            ['📊 reyting qoldirish', `🏕️ Dachalarni ko'rish`, '🙋🏼‍♂️ Help'],
        ]).resize());
    }
    async handledachaSelection(ctx) {
        const dachaName = ctx.match[0].split(':')[1];
        const dacha = await this.prisma.dacha.findFirst({
            where: { name: { equals: dachaName, mode: 'insensitive' } },
        });
        if (!dacha) {
            ctx.reply(`❌ ${dachaName} dachasi topilmadi.`);
            return;
        }
        ctx.session.dachaName = dacha.name.toLowerCase();
        return this.botService.sendReytingPrompt(ctx, dacha.name);
    }
    async Reyting(ctx) {
        const reyting = ctx.match[0].split(':')[1];
        await ctx.answerCbQuery();
        const user = await this.prisma.user.findFirst({
            where: { chat_id: ctx.from?.id },
        });
        if (!user) {
            ctx.reply('❌ Foydalanuvchi topilmadi.');
            return;
        }
        const dachaName = ctx.session.dachaName;
        if (!dachaName) {
            ctx.reply('❌ Avval dachani tanlang.');
            return;
        }
        const dacha = await this.prisma.dacha.findFirst({
            where: { name: { equals: dachaName, mode: 'insensitive' } },
        });
        if (!dacha) {
            ctx.reply(`❌ ${dachaName} dachasi topilmadi.`);
            return;
        }
        const existing = await this.prisma.reyting.findFirst({
            where: { user_id: user.id, dacha_id: dacha.id },
        });
        if (existing) {
            ctx.reply(`❌ Siz "${dacha.name}" uchun allaqachon reyting qoldirgansiz.`);
            return;
        }
        await this.prisma.reyting.create({
            data: {
                user_id: user.id,
                dacha_id: dacha.id,
                ball: +reyting,
            },
        });
        ctx.session.dachaName = '';
        ctx.reply(`✅ "${dacha.name}" uchun ${reyting} ball berildi`);
    }
};
exports.BotUpdate = BotUpdate;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "onStart", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('Asosiy sahifa'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "Asosiy", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('Ortga'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "OnOrqaga", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('dacha'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onStartAdmin", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('Reyting'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "OnReyting", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("🏕️ Dachalarni ko'rish"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onDachalar", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("🍱 Bugun qoyilgan Dachalar"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onOnqatlar", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('Kunlik foydalanuvchilar'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "Kunlik", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('dacha'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "ondachae", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('info'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "onInfo", null);
__decorate([
    (0, nestjs_telegraf_1.Command)('help'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "OnHelp", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('Orqaga qaytish'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "Ortga", null);
__decorate([
    (0, nestjs_telegraf_1.On)('photo'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "OnPhoto", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('Create'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "createAction", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('findAll'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "find_all", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('Delete'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "delet", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/del:(\d+)/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "deletedacha", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^UU:(\d+)$/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "deleteBugunDacha", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('save_dacha'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "savedacha", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('cancel_save'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "cancelSave", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('Bugun'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "bugun", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/bugun:(\d+)/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "Bugungi", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('✅ Saqlash'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "Onsaqlash", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("💎 Saralangan dachalar"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "saralangan", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("🗑 O'chirish"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "Ondelete", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('📊 reyting qoldirish'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onReytingUser", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('🔙 ortga'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "onOrtga", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)('🙋🏼‍♂️ Help'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "onHelp", null);
__decorate([
    (0, nestjs_telegraf_1.On)('text'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotUpdate.prototype, "text", null);
__decorate([
    (0, nestjs_telegraf_1.Action)('ortga'),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "ortgadacha", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^dacha:.+/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "handledachaSelection", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^reyting:\d$/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "Reyting", null);
exports.BotUpdate = BotUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bot_service_1.BotService,
        prisma_service_1.PrismaService])
], BotUpdate);
//# sourceMappingURL=bot.update.js.map