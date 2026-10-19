import { Module } from '@nestjs/common';
import { RightsService } from './rights.service';
import { RightsController } from './rights.controller';
@Module({ providers: [RightsService], controllers: [RightsController], exports: [RightsService] })
export class RightsModule {}
