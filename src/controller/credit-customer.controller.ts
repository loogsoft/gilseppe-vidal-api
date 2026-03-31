import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CreditCustomerRequestDto } from 'src/dtos/request/credit-customer-request.dto';
import { CreditCustomerResponseDto } from 'src/dtos/response/credit-customer-response.dto';
import { CreditCustomerService } from 'src/services/credit-customer.service';

@Controller('credit-customer')
export class CreditCustomerController {
  constructor(private readonly creditCustomerService: CreditCustomerService) {}

  @Post()
  async create(@Body() dto: CreditCustomerRequestDto): Promise<CreditCustomerResponseDto> {
    return this.creditCustomerService.create(dto);
  }

  @Get('companyId/:id')
  async findOne(@Param('companyId') companyId: string, @Param('id') id: string): Promise<CreditCustomerResponseDto> {
    return this.creditCustomerService.findOne(id, companyId);
  }

  @Get(':companyId')
  async findAll(@Param('companyId') companyId: string): Promise<CreditCustomerResponseDto[]> {
    return this.creditCustomerService.findAll(companyId);
  }
}
