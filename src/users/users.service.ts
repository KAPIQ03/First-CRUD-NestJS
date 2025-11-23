import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // get all
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  // get one
  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
  // create
  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
  // update
  async update(id: number, user: User): Promise<User | null> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }
  //delete
  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
