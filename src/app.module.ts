import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DocModule } from './doc/doc.module';
import { ChangeModule } from './change/change.module';

@Module({
    imports: [UserModule, AuthModule, JwtModule, DocModule, ChangeModule],
})
export class AppModule {}
