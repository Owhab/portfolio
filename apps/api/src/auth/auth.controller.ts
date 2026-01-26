import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
