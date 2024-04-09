import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const userEntity = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(userEntity);

      if (!user) {
        throw new BadRequestException('User not Created');
      }
      return user;
    } catch (e) {
      throw new InternalServerErrorException('Internal Error');
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['firstName', 'lastName'],
      searchableColumns: ['firstName', 'lastName'],
      defaultSortBy: [['firstName', 'DESC']]

    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User NotFound');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User NotFound');
    }
    const userUpdated = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    return userUpdated;
  }
  catch(e) {
    throw new InternalServerErrorException('Internal Error');
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User NotFound');
    }
    const userDelete = this.userRepository.remove(user);
    if (!userDelete) {
      throw new BadRequestException('User not Deleted');
    }
    return userDelete;
  }
}
