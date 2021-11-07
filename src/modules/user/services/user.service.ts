import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos';
import { User, UserDocument } from '../schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private catModel: Model<UserDocument>) {}
  createUser(user: CreateUserDto): Promise<User> {
    return this.catModel.create(user);
  }
}
