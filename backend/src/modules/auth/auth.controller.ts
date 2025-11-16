import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    try {
      const response = await this.authService.login(req.user.id);
      console.log(response.access_token);
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
