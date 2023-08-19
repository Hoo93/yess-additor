import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './jwt.const';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: Payload) {
        // prettier-ignore
        const isExpired =
            (new Date(payload.exp * 1000).getTime() - new Date().getTime()) / 1000 / 60 < 0;

        if (isExpired) {
            throw new Error('token is expired');
        }

        return { name: payload.name, email: payload.email };
    }
}
