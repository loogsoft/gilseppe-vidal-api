import { Expose, Type } from 'class-transformer';
import { CreditSaleStatusEnum } from '../enums/credit-sale-status.enum';
import { ProductResponseDto } from './product-response.dto';
import { CreditCustomerResponseDto } from './credit-customer-response.dto';

export class CreditSaleResponseDto {
  @Expose()
  id: string;
  @Expose()
  totalAmount: number;
  @Expose()
  companyId: string;
  @Expose()
  @Type(() => CreditCustomerResponseDto)
  customer: CreditCustomerResponseDto;
  @Expose()
  installment: number;
  @Expose()
  status: CreditSaleStatusEnum;
  @Expose()
  date: Date;
  @Expose()
  @Type(() => ProductResponseDto)
  products: ProductResponseDto[];
}
