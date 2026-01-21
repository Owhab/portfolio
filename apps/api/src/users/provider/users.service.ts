import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    // Inject User Repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // get users
  async findAll() {
    return this.userRepository.find();
  }
}
