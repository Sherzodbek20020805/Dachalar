import { IMyContext } from 'src/helpers/bot.sessin';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BotService {
    private readonly prisma;
    onAdmineditDacha(ctx: IMyContext): void;
    constructor(prisma: PrismaService);
    onStartAdmin(ctx: IMyContext): Promise<void>;
    onAdmineditDach(ctx: IMyContext): Promise<void>;
    onStart(ctx: IMyContext): Promise<void>;
    create(ctx: IMyContext): Promise<void>;
    Kunlik(ctx: IMyContext): Promise<void>;
    onUserAllDacha(ctx: IMyContext): Promise<void>;
    onhelp(ctx: IMyContext): Promise<void>;
    OnHelp(ctx: IMyContext): Promise<void>;
    onOrtga(ctx: IMyContext): Promise<void>;
    onreyting(ctx: IMyContext): Promise<void>;
    onInfo(ctx: IMyContext): Promise<void>;
    textmessage(ctx: IMyContext): Promise<void>;
    OnPhoto(ctx: IMyContext): Promise<void>;
    findAll(ctx: IMyContext): Promise<void>;
    Bugun(ctx: IMyContext): Promise<void>;
    Saqlash(ctx: IMyContext): Promise<void>;
    delet(ctx: IMyContext): Promise<void>;
    sendReytingPrompt(ctx: IMyContext, menuName: string): Promise<void>;
    saralanganlar(ctx: IMyContext): Promise<void>;
}
