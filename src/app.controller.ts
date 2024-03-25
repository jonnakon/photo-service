import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('login')
  @ApiOperation({summary:'Login using username and password'})
    @ApiCreatedResponse({
        description:'user has been successfully logged in'})
  @UseGuards(AuthGuard('local'))
  async login(@Request() req){
    const token = this.authService.login(req.user)
    return token
  }
}
