import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { PaginationQueryDto } from '../common/dtos/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { Permissions } from '../iam/authorization/decorators/permissions.decorator';
import { Permission } from '../iam/authorization/permission.type';
import {
  Auth,
  AuthType,
} from '../iam/authentication/decorators/auth.decorator';

@Auth(AuthType.Bearer, AuthType.ApiKey)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    // Using this decorator, we can inject User properties easily:
    @ActiveUser() user: ActiveUserData,
  ): Promise<Coffee[]> {
    console.log(user);
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeeService.findOne(id);
  }

  // @Roles(Role.Admin)
  @Permissions(Permission.CreateCoffee)
  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeeService.remove(id);
  }
}
