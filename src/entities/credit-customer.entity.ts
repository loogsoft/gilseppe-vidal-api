import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('credit-customer')
export class CreditCustomerEntity {
  // ID único da venda no crediário
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  companyId: string;

  // Nome do cliente
  @Column({ nullable: false })
  customerName: string;

  // Email do cliente
  @Column({ unique: true })
  customerEmail: string;

  // CPF do cliente
  @Column({ nullable: false, unique: true })
  CPF: string;

  // Telefone do cliente
  @Column({ nullable: false })
  phone: string;

  // Rua do endereço
  @Column({ nullable: false })
  road: string;

  // Número do endereço
  @Column({ nullable: false })
  number: string;

  // Bairro do endereço
  @Column({ nullable: false })
  neighborhood: string;

  // Cidade do endereço
  @Column({ nullable: false })
  city: string;

  // Estado do endereço
  @Column({ nullable: false })
  state: string;

  // CEP do endereço
  @Column({ nullable: false })
  zipCode: string;

  // Valor total de compras
  @Column({ nullable: true })
  totalAmounts: number;

  // Data da venda
  @CreateDateColumn({ type: 'timestamp' })
  date: Date;
}
