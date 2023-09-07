import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { parse, visit } from '@solidity-parser/parser';
import { ContractDefinition, ImportDirective, SourceUnit} from '@solidity-parser/parser/src/ast-types';

import { AnalyzeDto, DictionaryDto } from '../dto/analyze.dto';

@Injectable()
export class AnalyzeService {
	private readonly logger = new Logger(AnalyzeService.name);

	public analyzeCode(data: AnalyzeDto): DictionaryDto {
		this.logger.log(`Analyzing code: ${JSON.stringify(data)}`);

		const ast = this.validateAndParseCode(data.code);

		const dictionary: DictionaryDto = {
			imports: this.getImports(ast),
			contracts: this.getContracts(ast),
		};

		this.logger.log(`Code analyzed successfully: ${JSON.stringify(dictionary)}`);

		return dictionary;
	}

	private validateAndParseCode(code: string): SourceUnit {
		if (!code) {
			this.logger.log(`Solidity code is not provided.`);
			throw new BadRequestException('Solidity code is not provided.');
		}

		let ast: SourceUnit;

		try {
			ast = parse(code);
		} catch (e) {
			this.logger.log(`Error during parsing code: ${JSON.stringify(e)}`);
			throw new BadRequestException('Solidity code is incorrect.');
		}

		return ast;
	}

	private getImports(ast: SourceUnit): string[] {
		const imports: string[] = [];

		visit(ast, {
			ImportDirective: (node: ImportDirective): void => {
				imports.push(node.path);
			},
		});

		return imports;
	};

	private getContracts(ast: SourceUnit): string[] {
		const contracts: string[] = [];

		visit(ast, {
			ContractDefinition: (node: ContractDefinition): void => {
				contracts.push(node.name);
			},
		});

		return contracts;
	};
}
