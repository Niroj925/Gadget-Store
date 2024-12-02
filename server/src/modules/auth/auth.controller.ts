import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Redirect, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, MailDto, PasswordDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from 'src/middlewares/guard/google-auth/google-auth.guard';
import { Roles } from 'src/middlewares/authorisation/roles.decorator';
import { roleType } from 'src/helper/types/index.type';
import { RolesGuard } from 'src/middlewares/authorisation/roles.guard';
import { UtGuard } from 'src/middlewares/utils_token/ut.guard';
import { RtGuard } from 'src/middlewares/refresh_token/rt.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'SignIn your Account' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('refresh-token')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Generate access token" })
  @UseGuards(RtGuard)
  async refrshToken(@Req() req:any) {
    const { user } = req
    return this.authService.refreshTokenAdmin(user);
  }

  @Post('forget-password')
  async forgetPassword(@Body() body: MailDto) {
      return this.authService.forgetPasswordAdmin(body);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){

  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req:any,@Res() res:any){
  const user=req.user;
  if(user){
  res.redirect(`http://localhost:5173/purchase?customerId=${user.id}`)
  }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch('reset-password')
  @Roles(roleType.admin||roleType.delivery)
  @UseGuards(UtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  resetPassword(@Req() req:any, @Body() passwordDto: PasswordDto) {
    const userId=req.user.sub;
    return this.authService.resetPassword(userId, passwordDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
