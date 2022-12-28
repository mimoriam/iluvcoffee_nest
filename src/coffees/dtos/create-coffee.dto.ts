import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// https://docs.nestjs.com/openapi/types-and-parameters
export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a cofee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
