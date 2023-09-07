import { Module } from '@nestjs/common';

import { AnalyzeModule } from './analyze/analyze.module';
import { AppController } from './app.controller';

@Module({
  imports: [AnalyzeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
