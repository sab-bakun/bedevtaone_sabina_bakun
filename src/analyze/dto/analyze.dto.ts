import { ApiProperty } from '@nestjs/swagger';

const exampleSolidityCode: string = `import "VarysContractBase.sol"; import "VarysContractExtras.sol"; contract VarysContract { mapping (uint => address) public addresses; }`

export class AnalyzeDto {
	@ApiProperty({
		type: String,
		description: 'Solidity code',
		default: exampleSolidityCode,
	})
	code: string;
}

export class DictionaryDto {
	@ApiProperty({ type: [String] })
	imports: string[];

	@ApiProperty({ type: [String] })
	contracts: string[];
}
