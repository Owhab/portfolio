import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { compare, hash } from 'bcrypt';

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

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    await this.userRepository.update(userId, dto);
    return this.userRepository.findOneBy({ id: userId });
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'password'],
    });

    if (!user || !user.password) throw new BadRequestException();

    const valid = await compare(dto.oldPassword, user.password);
    if (!valid) throw new BadRequestException();

    user.password = await hash(dto.newPassword, 10);
    await this.userRepository.save(user);
  }
}
