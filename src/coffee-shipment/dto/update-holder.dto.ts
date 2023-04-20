import { IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHolderDto {
  @IsNotEmpty()
  @ApiProperty()
  holderId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsIn(['production', 'distribution', 'retail'])
  status: string;
}
