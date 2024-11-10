import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Redirect, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from 'src/middlewares/guard/google-auth/google-auth.guard';

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

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){

  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req:any,@Res() res:any){
  const user=req.user;
  if(user){
  res.redirect('http://localhost:5173/purchase')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
