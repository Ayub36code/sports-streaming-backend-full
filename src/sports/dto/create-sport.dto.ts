import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateSportDto {
  @ApiProperty() @IsString() slug: string;
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() category?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isTeamBased?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() scoringType?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() metadata?: any;
}
