import {
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './Interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(input: UpdateUserDto) {
    const check = await this.userModel.findOne({ email: input.email });
    if (check?.email) throw new UnauthorizedException('User already exists');

    const hashedpassword = await bcrypt.hash(input.password, 10);
    const user = new this.userModel({
      username: input.username,
      email: input.email,
      password: hashedpassword,
    });

    await user.save();

    return {
      token: await this.signUser(input.email, input.username),
      user: {
        username: input.username,
        email: input.email,
        statuscode: HttpStatus.OK,
      },
      date: new Date(),
    };
  }

  async signin(input: UserDto) {
    const check = await this.userModel.findOne({ email: input.email });
    if (!check?.email) throw new UnauthorizedException('User doesnot exists');
    const match = await bcrypt.compare(input.password, check?.password);
    if (!match) throw new UnauthorizedException('Incorrect password');
    return {
      token: await this.signUser(check?.email, check?.username),
      user: {
        userId: check?._id,
        username: check?.username,
        email: check?.email,
        statuscode: HttpStatus.OK,
      },
      date: new Date(),
    };
  }

  async signUser(email: string, username: string) {
    return this.jwtService.sign({
      email,
      username,
    });
  }
}
