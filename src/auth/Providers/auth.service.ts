import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { UserRepository } from '../Repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../DTO/user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }
  registerAccount(body: UserDto): Observable<UserDto> {
    let { first_name, last_name, email, password } = body;
    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            password: hashedPassword,
            first_name,
            last_name,
            email,
          }),
        ).pipe(
          map((user: UserDto) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }
  validateUser(email: string, password: string): Observable<UserDto> {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: [
            'email',
            'password',
            'first_name',
            'last_name',
            'id',
            'role',
          ],
        },
      ),
    ).pipe(
      switchMap((user: UserDto) => {
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        );
      }),
    );
  }
  login(user: UserDto): Observable<string> {
    const { email, password } = user;

    return this.validateUser(email, password).pipe(
      switchMap((user: UserDto) => {
        console.log(user);
        if (user) {
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }

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
}

// this funtion is created to accept a function that accepts  one string arg and return a User type value
// function switchMap(
//   args0: (hashedPassword: string) => void,
// ): import('rxjs').OperatorFunction<string, UserDto> {
//   throw new Error('function is not implemented');
// }
