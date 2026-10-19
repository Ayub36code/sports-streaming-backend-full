import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthletesController } from './athletes.controller';
@Module({ providers: [AthletesService], controllers: [AthletesController] })
export class AthletesModule {}
