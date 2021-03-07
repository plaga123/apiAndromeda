import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { SigninDto, SignupDto } from 'src/dto';
import { User } from 'src/entity/user.entity';
import { IJwtPayload } from 'src/interface/jwt-payload.interface';
import { AuthRepository } from 'src/repository/auth.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService,
      ) {}


      async signup(signupDto: SignupDto): Promise<any> {
        const {email } = signupDto;
        const userExists = await this._authRepository.findOne({
          where: [{ email }],
        });
    
        if (userExists) {
          throw new ConflictException('Email ya esta registrado');
        }
    
        this._authRepository.signup(signupDto);

        return {code:200,message:'Usuario registrado'};
      }
    
      async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { email, password } = signinDto;
    
        const user: User = await this._authRepository.findOne({
          where: { email },
        });
    
        if (!user) {
          throw new NotFoundException('user does not exist');
        }
    
        const isMatch = await compare(password, user.password);
    
        if (!isMatch) {
          throw new UnauthorizedException('invalid credentials');
        }
    
        const payload: IJwtPayload = {
          id: user.id,
          email: user.email          
        };
    
        const token = await this._jwtService.sign(payload);
    
        return { token };
      }




}
