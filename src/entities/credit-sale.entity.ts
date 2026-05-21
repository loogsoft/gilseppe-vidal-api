import { CreditSaleStatusEnum } from 'src/dtos/enums/credit-sale-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreditCustomerEntity } from './credit-customer.entity';

@Entity('credit-sale')
export class CreditSaleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => CreditCustomerEntity, (customer) => customer.creditSales)
  customer: CreditCustomerEntity;

  @Column({ nullable: true })
  companyId: string;

  // Valor total da compra
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number;

  // Quantidade de parcelas
  @Column({ nullable: false })
  installment: number;

  // Status da venda (pendente, pago, atrasado, etc)
  @Column({ nullable: false })
  status: CreditSaleStatusEnum;

  // Data da venda
  @Column()
  date: Date;

  @OneToMany(() => ProductEntity, (product) => product.creditSale, {
    nullable: false,
  })
  products: ProductEntity[];
}
