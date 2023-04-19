import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateHolderDto {
  @IsNotEmpty()
  holderId: number;

  @IsNotEmpty()
  @IsIn(['production', 'distribution', 'retail'])
  status: string;
}
