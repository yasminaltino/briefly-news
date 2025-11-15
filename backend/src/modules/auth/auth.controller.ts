import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    try {
      const response = await this.authService.login(req.user.id);

      res.redirect(
        `http://localhost:5173/feed?token=${response.access_token}&user=${encodeURIComponent(JSON.stringify(response.user))}`,
      );
    } catch (error) {
      res.redirect(
        `http://localhost:5173/?error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  // @Post('logout')
  // async logout(@Req() req: any) {
  //   return this.authService.logout(req.user?.id);
  // }
}
