import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserDto } from '../DTO/user.dto';
import { AuthService } from '../Providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  register(@Body() body: UserDto): Observable<UserDto> {
    return this.authService.registerAccount(body);
  }
  @Post('/login')
  login(@Body() body: UserDto): Observable<{ token: string }> {
    return this.authService
      .login(body)
      .pipe(map((jwtToken) => ({ token: jwtToken })));
  }
}
