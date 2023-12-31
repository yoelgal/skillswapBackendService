import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/* your dependencies here */) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Set to true if you want to ignore token expiration
      secretOrKey: process.env.JWT_SECRET, // Your JWT secret
      // Optionally add other configurations
    });
  }

  async validate(payload: any) {
    // Your validation logic
    // For example, you could validate the user exists in your DB
    return { id: payload.sub, email: payload.username };
  }
}
