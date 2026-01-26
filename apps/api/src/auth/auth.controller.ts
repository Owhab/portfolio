import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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

  @Get('me')
  async me(@Req() req: any) {
    return this.authService.getCurrentUser(req.user.sub);
  }
}
