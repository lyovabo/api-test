import {
  Controller,
  Get,
  Post,
  Body,
  Redirect,
  Query,
  Param,
  Put,
  Delete,
  BadRequestException,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception.filter';
import { ZodValidationPipe } from 'src/zod.validation.pipe';
import { RolesGuard } from 'src/role.guard';
import { ValidationPipe } from '../validation.pipe';
import { CreateRatDto, createRatSchema } from './dto/create-rat.dto';
import { RatsService } from './rats.service';
import { Rat } from './interfaces/rat.interface';
import { UpdateRatDto } from './dto/update-rat.dto';

@UseGuards(RolesGuard)
@Controller('rats')
export class RatsController {
  constructor(private ratsService: RatsService) {
    console.log(ratsService);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createRatSchema))
  async create(@Body() createRatDto: CreateRatDto) {
    this.ratsService.create(createRatDto);
  }

  @Get()
  async findAll(): Promise<Rat[]> {
    return this.ratsService.findAll();
  }
  @Get('/exception')
  @UseFilters(new HttpExceptionFilter())
  async exception(): Promise<Rat[]> {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }

  // example for parseintpipe
  // pipe is running before parameter
  // enters to the controller callback
  // you can set multiple pipes one by one
  @Get(':id')
  findOne(@Param('id', ParseIntPipe, ValidationPipe) id: number) {
    console.log(typeof id);

    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRatDto: UpdateRatDto) {
    console.log(updateRatDto);

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
