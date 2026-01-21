import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from 'src/common/enums/provider.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard(Provider.LOCAL))
  @Post('login')
  login(@Req() req) {
    return this.authService.generateToken(req.user);
  }

  @Get(Provider.GOOGLE)
  @UseGuards(AuthGuard(Provider.GOOGLE))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard(Provider.GOOGLE))
  googleCallback(@Req() req) {
    return this.authService.generateToken(req.user);
  }

  @Get(Provider.GITHUB)
  @UseGuards(AuthGuard(Provider.GITHUB))
  githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard(Provider.GITHUB))
  githubCallback(@Req() req) {
    return this.authService.generateToken(req.user);
  }
}
