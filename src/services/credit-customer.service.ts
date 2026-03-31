import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCustomerEntity } from '../entities/credit-customer.entity';
import { CreditCustomerRequestDto } from 'src/dtos/request/credit-customer-request.dto';
import { CreditCustomerResponseDto } from 'src/dtos/response/credit-customer-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreditCustomerService {
  constructor(
    @InjectRepository(CreditCustomerEntity)
    private readonly repo: Repository<CreditCustomerEntity>,
  ) {}

  async create(dto: CreditCustomerRequestDto): Promise<CreditCustomerResponseDto> {
    const entity = this.repo.create({ ...dto });
    const saved = await this.repo.save(entity);
    return plainToInstance(CreditCustomerResponseDto, saved, { excludeExtraneousValues: true });
  }

  async findOne(id: string, companyId: string): Promise<CreditCustomerResponseDto> {
    const entity = await this.repo.findOneByOrFail({ id, companyId });
    return plainToInstance(CreditCustomerResponseDto, entity, { excludeExtraneousValues: true });
  }

  async findAll(companyId: string): Promise<CreditCustomerResponseDto[]> {
    const list = await this.repo.find({ where: { companyId } });
    return plainToInstance(CreditCustomerResponseDto, list, { excludeExtraneousValues: true });
  }


}
