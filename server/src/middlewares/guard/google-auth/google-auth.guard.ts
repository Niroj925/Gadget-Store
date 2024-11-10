import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google'){}



@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
      prompt: 'select_account'
    });
  }
}
