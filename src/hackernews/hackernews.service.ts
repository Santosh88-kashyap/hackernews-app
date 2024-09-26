import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class HackernewsService {
    constructor(private httpService: HttpService) {}

    private async fetchStories(limit: number) {
        const { data } = await this.httpService
            .get('https://hacker-news.firebaseio.com/v0/topstories.json')
            .toPromise();
        const storyIds = data.slice(0, limit);
        return Promise.all(storyIds.map(id => 
            this.httpService
                .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .pipe(map(response => response.data))
                .toPromise()
        ));
    }

    private async fetchUserKarmaAbove(threshold: number) {
        const { data } = await this.httpService
            .get('https://hacker-news.firebaseio.com/v0/topstories.json')
            .toPromise();
        const users = await Promise.all(data.map(async id => {
            const story = await this.httpService
                .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .toPromise();
            return story.data?.by;
        }));

        const userKarmaPromises = _.uniq(users).map(async user => {
            const userData = await this.httpService
                .get(`https://hacker-news.firebaseio.com/v0/user/${user}.json`)
                .toPromise();
            return userData.data;
        });

        const userKarmas = await Promise.all(userKarmaPromises);
        return userKarmas.filter(user => user.karma >= threshold);
    }

    private extractWords(titles: string[]): string[] {
        return _.chain(titles)
            .flatMap(title => title.split(' '))
            .countBy()
            .entries()
            .orderBy([1], ['desc'])
            .map(entry => entry[0])
            .take(10)
            .value();
    }

    async getTopWordsFromLastStories(count: number) {
        const stories = await this.fetchStories(count);
        const titles = stories.map(story => story.title).filter(Boolean);
        return this.extractWords(titles);
    }

    async getTopWordsFromWeek() {
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const stories = await this.fetchStories(25);
        const titles = stories
            .filter(story => story.time * 1000 >= oneWeekAgo)
            .map(story => story.title)
            .filter(Boolean);
        return this.extractWords(titles);
    }

    async getTopWordsFromHighKarmaUsers() {
        const highKarmaUsers = await this.fetchUserKarmaAbove(10000);
        const stories = await this.fetchStories(600);
        const titles = stories
            .filter(story => highKarmaUsers.some(user => user.id === story.by))
            .map(story => story.title)
            .filter(Boolean);
        return this.extractWords(titles);
    }
}
