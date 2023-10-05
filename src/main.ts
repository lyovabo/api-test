import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // in order to set up a global guard,
  // use the useGlobalGuards()
  // method of the Nest application instance
  // reflector creation is not the best practice
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
