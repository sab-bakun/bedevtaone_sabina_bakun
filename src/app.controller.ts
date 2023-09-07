import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor() {}

	@Get('/')
	@ApiTags('Main')
	@ApiOkResponse({ description: 'Returning welcome text.', type: String })
	public app(): string {
		return `Hello! API is working, you can see documentation by link: <a href="http://localhost:3001/api">http://localhost:3001/api</a>`;
	}
}
