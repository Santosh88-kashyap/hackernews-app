import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackernewsModule } from './hackernews/hackernews.module';

@Module({
  imports: [HackernewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
