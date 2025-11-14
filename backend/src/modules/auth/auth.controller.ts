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

      // res.redirect(`http://localhost:3001?token=${response.access_token}`);

      res.json({
        message: 'Login successful! Copy the token and test /auth/profile',
        user: response.user,
        access_token: response.access_token,
        instructions: 'Use this token in Authorization header: Bearer <token>',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // @Post('logout')
  // async logout(@Req() req: any) {
  //   return this.authService.logout(req.user?.id);
  // }
}
