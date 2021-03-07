
import { genSalt, hash } from 'bcryptjs';
import { SignupDto } from 'src/dto';
import { User } from 'src/entity/user.entity';
import { Repository, EntityRepository, getConnection } from 'typeorm';


@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    async signup(signupDto: SignupDto) {
        const {email, password } = signupDto;
        const user = new User();

        user.email = email;    
    
        const salt = await genSalt(10);
        user.password = await hash(password, salt);
    
        await user.save();        
      }
}
