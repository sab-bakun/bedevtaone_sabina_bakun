import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDto {
	@ApiProperty({ type: Number })
	statusCode: number;

	@ApiProperty({ type: String, nullable: true })
	message: string | null;
}
