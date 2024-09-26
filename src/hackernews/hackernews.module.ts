import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HackernewsController } from './hackernews.controller';
import { HackernewsService } from './hackernews.service';

@Module({
    imports: [HttpModule],
    controllers: [HackernewsController],
    providers: [HackernewsService],
})
export class HackernewsModule {}
