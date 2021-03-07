import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/service/user.service';


@Controller('/user')
export class UserController {

    constructor(private readonly _userService: UserService) {}

  
    @Get()
    async getUsers(){
      const users = await this._userService.getAll();      
      return users;
    }
  
    @Get()
    async getUser(@Param() id:number){
      const users = await this._userService.get(id);
      return users;
    } 

    // @Post()
    // async publicRegistration(@Body() dto: UserDto) {
    //   const data = await this._userService.createOne({
    //     ...dto,
    //   });
    //   return { code:200,message: 'Usuario Registrado', data };
    // }

  
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
      const updatedUser = await this._userService.update(id, user);
      return true;
    }
  
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
     const userEdit = await this._userService.delete(id);
      return {code:200,message:'Usuario Eliminado'};
    }
  
 
}
