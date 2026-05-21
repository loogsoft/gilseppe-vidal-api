import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreditSaleRequestDto } from 'src/dtos/request/credit-sale-request.dto';
import { CreditSaleResponseDto } from 'src/dtos/response/credit-sale-response.dto';
import { CreditSaleService } from '../services/credit-sale.service';

@Controller('credit-sale')
export class CreditSaleController {
  constructor(private readonly creditSaleService: CreditSaleService) {}

  @Post()
  async create(@Body() dto: CreditSaleRequestDto): Promise<CreditSaleResponseDto> {
    return await this.creditSaleService.create(dto);
  }

  @Get(':companyId')
  async findAll(@Param('companyId') companyId: string): Promise<CreditSaleResponseDto[]> {
    return await this.creditSaleService.findAll(companyId);
  }
}
