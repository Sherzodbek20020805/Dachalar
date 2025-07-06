import { OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
export declare class UtilService implements OnModuleInit {
    private readonly Bot;
    constructor(Bot: Telegraf);
    onModuleInit(): Promise<void>;
}
