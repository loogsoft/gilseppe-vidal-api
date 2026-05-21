import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreditSaleRequestDto } from 'src/dtos/request/credit-sale-request.dto';
import { CreditSaleResponseDto } from 'src/dtos/response/credit-sale-response.dto';
import { CreditCustomerEntity } from '../entities/credit-customer.entity';
import { CreditSaleEntity } from '../entities/credit-sale.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class CreditSaleService {
  constructor(
    @InjectRepository(CreditSaleEntity)
    private readonly creditSaleRepository: Repository<CreditSaleEntity>,

    @InjectRepository(CreditCustomerEntity)
    private readonly creditCustomerRepository: Repository<CreditCustomerEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreditSaleRequestDto): Promise<CreditSaleResponseDto> {
    const customer = await this.creditCustomerRepository.findOne({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Cliente do crediario nao encontrado');
    }

    const productIds = [...new Set(dto.productIds)];
    const products = await this.productRepository.find({
      where: { id: In(productIds) },
      relations: { creditSale: true },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Um ou mais produtos nao foram encontrados');
    }

    const productAlreadyLinked = products.find((product) => product.creditSale);

    if (productAlreadyLinked) {
      throw new BadRequestException(
        'Um ou mais produtos ja estao associados a uma venda fiado',
      );
    }

    return await this.creditSaleRepository.manager.transaction(
      async (manager) => {
        const creditSaleRepository = manager.getRepository(CreditSaleEntity);
        const productRepository = manager.getRepository(ProductEntity);

        const entity = creditSaleRepository.create({
          totalAmount: dto.totalAmount,
          installment: dto.installment,
          status: dto.status,
          date: dto.date,
          customer,
          companyId: dto.companyId,
        });

        const savedCreditSale = await creditSaleRepository.save(entity);

        await productRepository.save(
          products.map((product) => ({
            ...product,
            creditSale: savedCreditSale,
          })),
        );

        const createdCreditSale = await creditSaleRepository.findOneOrFail({
          where: { id: savedCreditSale.id },
          relations: {
            customer: true,
            products: true,
          },
        });

        return plainToInstance(CreditSaleResponseDto, createdCreditSale, {
          excludeExtraneousValues: true,
        });
      },
    );
  }

  async findAll(companyId: string): Promise<CreditSaleResponseDto[]> {
    const creditSales = await this.creditSaleRepository.find({
      where: { companyId },
      relations: {
        customer: true,
        products: true,
      },
      order: {
        date: 'DESC',
      },
    });

    return plainToInstance(CreditSaleResponseDto, creditSales, {
      excludeExtraneousValues: true,
    });
  }
}
