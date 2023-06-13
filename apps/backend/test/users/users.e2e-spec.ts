import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto/update-user.dto';
import { AppModule } from '../../src/app.module';

describe('Users: /users (e2e)', () => {
  let app: INestApplication;
  let id: string;
  let auth: string;

  const user: CreateUserDto = {
    name: 'Rodrigo',
    cnpj: '12345678984',
    email: 'rod@rod.com.br',
    password: 'IamNorma4l123!',
  };

  const login = {
    email: 'adm@adm.com',
    password: 'IamAdm123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(login);

    auth = response.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should denny access to find all (GET) /all', async () => {
    const createTest = async () => {
      const createResponse = await request(app.getHttpServer()).get(
        '/api/users/all',
      );
      expect(createResponse.status).toStrictEqual(HttpStatus.FORBIDDEN);
    };
    return await createTest();
  });
  it('should Create (POST) /users', async () => {
    const createTest = async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/api/users')
        .send(user);
      //.set('Authorization', `Bearer ${auth}`);
      id = createResponse.body._id;
      console.log(createResponse.body);

      const expectedUser = {
        name: 'Rodrigo',
        roles: 3,
        email: 'rod@rod.com.br',
      };

      expect(createResponse.status).toStrictEqual(HttpStatus.CREATED);
      expect(createResponse.body).toMatchObject(expectedUser);
    };
    return await createTest();
  });

  it.todo('should deny to create user when it send incorrect params');
  it('should denny access to update (PUT) /users', async () => {
    const updateUser: UpdateUserDto = {
      ...user,
      name: 'Augusto',
      password: undefined,
    };

    const updateTest = async () => {
      return await request(app.getHttpServer())
        .put('/api/users/' + id)
        .send(updateUser)
        .expect(HttpStatus.FORBIDDEN);
    };
    return await updateTest();
  });
  it('should update (PUT) /users', async () => {
    const updateUser: UpdateUserDto = {
      ...user,
      name: 'Augusto',
      password: undefined,
    };

    const updateTest = async () => {
      return await request(app.getHttpServer())
        .put('/api/users/' + user.email)
        .send(updateUser)
        .set('Authorization', `Bearer ${auth}`)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedUser: UpdateUserDto = {
            name: 'Augusto',
            email: 'rod@rod.com.br',
          };

          expect(body).toMatchObject(expectedUser);
        });
    };
    return await updateTest();
  });
  it.todo('should (GET) /users');
  it('should denny access to remove (DELETE) /', async () => {
    const deleteTeste = async () => {
      return await request(app.getHttpServer())
        .delete(`/api/users/` + user.email)
        .expect(HttpStatus.FORBIDDEN);
    };
    return await deleteTeste();
  });
  it('should remove (DELETE) /', async () => {
    const deleteTeste = async () => {
      return await request(app.getHttpServer())
        .delete(`/api/users/` + user.email)
        .set('Authorization', `Bearer ${auth}`)
        .expect(HttpStatus.NO_CONTENT);
    };
    return await deleteTeste();
  });
});
