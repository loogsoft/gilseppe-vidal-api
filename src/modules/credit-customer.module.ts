import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCustomerEntity } from '../entities/credit-customer.entity';
import { CreditCustomerService } from '../services/credit-customer.service';
import { CreditCustomerController } from '../controller/credit-customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCustomerEntity])],
  controllers: [CreditCustomerController],
  providers: [CreditCustomerService],
  exports: [CreditCustomerService],
})
export class CreditCustomerModule {}
