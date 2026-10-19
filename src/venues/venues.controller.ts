import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VenuesService } from './venues.service';
import { Public } from '../common/decorators/public.decorator';
@ApiTags('Venues')
@Controller({ path: 'venues', version: '1' })
export class VenuesController {
  constructor(private s: VenuesService) {}
  @Public() @Get() list() { return this.s.list(); }
  @Public() @Get(':id') get(@Param('id') id: string) { return this.s.get(id); }
  @Post() create(@Body() dto: any) { return this.s.create(dto); }
}
