import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { Public } from '../common/decorators/public.decorator';
@ApiTags('Search')
@Controller({ path: 'search', version: '1' })
export class SearchController {
  constructor(private s: SearchService) {}
  @Public() @Get() search(@Query('q') q: string) { return this.s.search(q); }
  @Public() @Get('live-now') live() { return this.s.liveNow(); }
  @Public() @Get('featured') featured() { return this.s.featured(); }
}
