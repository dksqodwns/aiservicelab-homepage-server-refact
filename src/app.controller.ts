import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RequestJoinDto } from './dto/RequestJoinDto';
import { RequestLoginDto } from './dto/RequestLoginDto';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/main')
  getMain() {
    return this.appService.getMain();
  }

  @Post('/join')
  async postJoin(@Body() body: RequestJoinDto) {
    return await this.appService.join(body);
  }

  @Post('/login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: RequestLoginDto,
  ) {
    const user = await this.appService.findOne(body.email);

    const comparePassword = await this.appService.comparing(body.pwd, user.pwd);

    if (!comparePassword) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 401);
    }

    const accessToken = await this.appService.generateToken({
      payload: {
        userid: user.userid,
        email: user.email,
      },
      tokenType: 'accessToken',
    });

    const refreshToken = await this.appService.generateToken({
      payload: {
        userid: user.userid,
        email: user.email,
      },
      tokenType: 'refreshToken',
    });

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.header('Authorization', `Bearer ${accessToken}`);

    return res.json({ accessToken, refreshToken });
  }
}
