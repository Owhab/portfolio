import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // Inject User Repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Login
  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('User not found');
    }

    const match = await compare(dto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
