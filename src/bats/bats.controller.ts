import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Redirect,
  Query,
  Param,
  Put,
  Delete,
  BadRequestException,
  UseFilters,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception.filter';
import { RolesGuard } from 'src/role.guard';
import { ValidationPipe, ValidationPipe2 } from '../validation.pipe';
import { CreateBatDto } from './dto/create-bat.dto';
import { BatsService } from './bats.service';
import { Bat } from './interfaces/bat.interface';
import { UpdateBatDto } from './dto/update-bat.dto';

@UseGuards(RolesGuard)
@Controller('bats')
export class BatsController {
  constructor(private catsService: BatsService) {
    console.log(catsService);
  }

  @Post()
  @HttpCode(204)
  async create(@Body() createCatDto: CreateBatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Bat[]> {
    return this.catsService.findAll();
  }
  @Get('/exception')
  @UseFilters(new HttpExceptionFilter())
  async exception(): Promise<Bat[]> {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }

  // example for parseintpipe
  // pipe is running before parameter
  // enters to the controller callback
  // you can set multiple pipes one by one
  // ParseIntPipe take id param from request
  // and parse it from string to int
  // ValidationPipe is manually written pipe
  // validates the type of argument
  // after parsing is being happened
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe, ValidationPipe, ValidationPipe2) id: number,
  ) {
    console.log(typeof id);

    return `This action returns asdfasd  fasdfa #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateBatDto) {
    console.log(updateCatDto);

    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  async redirect() {}
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
