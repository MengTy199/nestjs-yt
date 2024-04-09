import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33061,
      username: 'root',
      password: 'example',
      database: 'nestjs',
      // autoLoadEntities: true,
      entities: [User],
      synchronize: true,// Do not use in production
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
