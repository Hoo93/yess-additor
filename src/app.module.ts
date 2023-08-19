import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
    imports: [UsersModule],
    controllers: [AppController],
})
export class AppModule {}
