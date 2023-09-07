import { Module } from '@nestjs/common';

import { AnalyzeController } from './controller/analyze.controller';
import { AnalyzeService } from './services/analyze.service';

@Module({
	imports: [],
	controllers: [AnalyzeController],
	providers: [AnalyzeService],
})
export class AnalyzeModule {}
