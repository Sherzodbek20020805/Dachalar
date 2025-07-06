import { IMyContext } from 'src/helpers/bot.sessin';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BotService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onStartAdmin(ctx: IMyContext): Promise<void>;
    onAdmineditMenyu(ctx: IMyContext): Promise<void>;
    onStart(ctx: IMyContext): Promise<void>;
    create(ctx: IMyContext): Promise<void>;
    Kunlik(ctx: IMyContext): Promise<void>;
    onUserAllMenyu(ctx: IMyContext): Promise<void>;
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
