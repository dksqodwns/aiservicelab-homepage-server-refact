import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { Post } from './entities/post';
import { Plan } from './entities/plan';
import { Project } from './entities/project';
import { Notice } from './entities/notice';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestJoinDto } from './dto/RequestJoinDto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException('해당하는 유저가 없습니다.', 404);
    }
    return user;
  }

  async getMain() {
    const post = await this.postRepository.find({});
    const plan = await this.planRepository.find({});
    const project = await this.projectRepository.find({});
    const notice = await this.noticeRepository.find({});

    return {
      post,
      plan,
      project,
      notice,
    };
  }

  async join(body: RequestJoinDto): Promise<User> {
    if (
      !body.email ||
      !body.answer ||
      !body.pwd ||
      !body.name ||
      !body.question
    ) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const existUser = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (existUser) {
      throw new ConflictException();
    }

    return await this.userRepository.save({
      ...body,
      pwd: await this.hashing(body.pwd),
    });
  }

  async generateToken({
    payload,
    tokenType,
  }: {
    payload: JwtPayload;
    tokenType: 'accessToken' | 'refreshToken';
  }): Promise<string> {
    if (tokenType === 'accessToken') {
      return this.jwtService.sign(payload);
    } else {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      });
      await this.userRepository.update(
        { userid: payload.userid },
        { token: refreshToken },
      );
      return refreshToken;
    }
  }

  async comparing(word: string, hashedWord: string) {
    return await bcrypt.compare(word, hashedWord);
  }

  private async hashing(word: string) {
    return await bcrypt.hash(word, 12);
  }
}
