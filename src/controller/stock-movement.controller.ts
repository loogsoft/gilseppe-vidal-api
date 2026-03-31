import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StockMovementRequestDto } from 'src/dtos/request/stock-movement-request.dto';
import { StockMovementService } from 'src/services/stock-movement.service';

@Controller('stock-movements')
export class StockMovementController {
  constructor(private readonly service: StockMovementService) {}

  @Post()
  create(@Body() dto: StockMovementRequestDto) {
    return this.service.create(dto);
  }

  @Get('find-all/:companyId')
  findAll(@Param('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  @Get('variation/:variationId')
  findByVariation(@Param('variationId') variationId: string) {
    return this.service.findByVariation(variationId);
  }
}
