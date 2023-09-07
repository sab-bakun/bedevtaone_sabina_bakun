import {
	Body,
	Controller,
	Post,
	UseFilters,
	HttpCode,
} from '@nestjs/common';
import {
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiTags,
} from '@nestjs/swagger';

import { AnalyzeService } from '../services/analyze.service';
import { AnalyzeDto, DictionaryDto } from '../dto/analyze.dto';
import { HttpExceptionDto, HttpExceptionFilter } from '../../filters';

@Controller('analyze')
@ApiTags('Analyze')
@UseFilters(HttpExceptionFilter)
export class AnalyzeController {
	constructor(private readonly analyzeService: AnalyzeService) {}

	@Post('/')
	@HttpCode(200)
	@ApiOkResponse({ description: 'Solidity code parsed successfully.', type: DictionaryDto })
	@ApiBadRequestResponse({ description: 'Solidity code is incorrect or not provided.', type: HttpExceptionDto })
	public analyze(@Body() data: AnalyzeDto): DictionaryDto {
		return this.analyzeService.analyzeCode(data);
	}
}
