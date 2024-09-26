import { Controller, Get } from '@nestjs/common';
import { HackernewsService } from './hackernews.service';

@Controller('hackernews')
export class HackernewsController {
    constructor(private hackernewsService: HackernewsService) {}

    @Get('top-words/latest')
    async getTopWordsLatest() {
        return this.hackernewsService.getTopWordsFromLastStories(25);
    }

    @Get('top-words/last-week')
    async getTopWordsLastWeek() {
        return this.hackernewsService.getTopWordsFromWeek();
    }

    @Get('top-words/high-karma-users')
    async getTopWordsHighKarmaUsers() {
        return this.hackernewsService.getTopWordsFromHighKarmaUsers();
    }
}
