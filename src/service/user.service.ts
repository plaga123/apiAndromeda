import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,      
              
      ) {}

    async getAll(){    
      return await this._userRepository.find({where:{status:'ACTIVE'}});
    }

    async get(id: number): Promise<User> {
      if (!id) {
        throw new BadRequestException('id must be sent');
      }
  
      const user: User = await this._userRepository.findOne(id, {
        where:{status:'ACTIVE'}
      });
  
      if (!user) {
        throw new NotFoundException();
      }
  
      return user;
    }

    async getEmail(email: string): Promise<User> {
      if (!email) {
        throw new BadRequestException('id must be sent');
      }
     
      const user: User = await this._userRepository.findOne({email});
  
      if (!user) {
        throw new NotFoundException();
      }
  
      return user;
    }
   
    async createOne(dto: UserDto) {
      const userExist = await this._userRepository.findOne({ email: dto.email });
      if (userExist)
        throw new BadRequestException('Email ya esta registrado');
  
      const newUser = this._userRepository.create(dto);
      const user = await this._userRepository.save(newUser);
  
      delete user.password;
      return user;
    }

    async update(id: number, user: User): Promise<void> {
      await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
      const userExist = await this._userRepository.findOne(id);

      if (!userExist) {
        throw new NotFoundException();
      }
  
      await this._userRepository.update(id, { status: 'INACTIVE' });
    }

}
