import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { UserRepository } from '../Repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../DTO/user.dto';
import { User } from '../Entities/user.entity';
import { UpdateResult } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  getUserById(id: number): Observable<UserDto> {
    return from(
      this.userRepository.findOne(id, { relations: ['feedPosts'] }),
    ).pipe(
      map((user: UserDto) => {
        delete user.password;
        return user;
      }),
    );
  }
  updateUserImageById(id: number, imagePath: string): Observable<UpdateResult> {
    const user = new User();
    user.id = id;
    user.imagePath = imagePath;
    return from(this.userRepository.update(id, { ...user }));
  }
}

// this funtion is created to accept a function that accepts  one string arg and return a User type value
// function switchMap(
//   args0: (hashedPassword: string) => void,
// ): import('rxjs').OperatorFunction<string, UserDto> {
//   throw new Error('function is not implemented');
// }
