import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,   
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';

  
  @Entity('users')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
    email: string;   
  
    @Column({ type: 'varchar', nullable: false })
    password: string;  
  
    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  }
  