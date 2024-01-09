import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { Post } from './entities/post';
import { Plan } from './entities/plan';
import { Project } from './entities/project';
import { Notice } from './entities/notice';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly postRepository: Repository<Post>,
    private readonly planRepository: Repository<Plan>,
    private readonly projectRepository: Repository<Project>,
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async getMain() {
    const post = await this.postRepository.find({});
  }
}
