import { Module } from '@nestjs/common';
import { EntitlementsService } from './entitlements.service';
import { EntitlementsController } from './entitlements.controller';
import { RightsModule } from '../rights-management/rights.module';
import { JwtModule } from '@nestjs/jwt';
@Module({ imports: [RightsModule, JwtModule.register({})], providers: [EntitlementsService], controllers: [EntitlementsController], exports: [EntitlementsService] })
export class EntitlementsModule {}
