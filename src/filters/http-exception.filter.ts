import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { HttpExceptionDto } from './http-exception.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

	catch(exception: HttpException, host: ArgumentsHost): void {
		const httpArgumentsHost = host.switchToHttp();
		const response = httpArgumentsHost.getResponse<Response>();
		const statusCode = exception.getStatus();
		const message = exception.message || null;

		const body: HttpExceptionDto = {
			statusCode,
			message,
		};

		this.logger.warn(`${statusCode} ${message}`);

		response.status(statusCode).json(body);
	}
}
