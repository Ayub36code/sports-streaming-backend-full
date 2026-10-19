import { IsString, IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';
export class CreateEventDto {
  @ApiProperty() @IsString() slug: string;
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsUUID() sportId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() competitionId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() seasonId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() venueId?: string;
  @ApiProperty() @IsDateString() scheduledAt: string;
  @ApiPropertyOptional() @IsOptional() @IsEnum(EventStatus) status?: EventStatus;
  @ApiPropertyOptional() @IsOptional() metadata?: any;
}
