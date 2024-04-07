import { expect } from 'chai';
import supertest from 'supertest';
import _dirname from '../utils.js';
import logger from '../logger/index.js';

const request = supertest('http://127.0.0.1:8080');

describe('Testing Users', () => {
  describe('Testing register', async () => {});

  describe('Testing login', async () => {
    const userMock = {
      email: 'nxzavdev@gmail.com',
      password: 'secreto',
    };
    const { statusCode, ok, _body } = await request.post('/api/auth/login').send(userMock);
    console.log({ statusCode, ok, _body });

    expect(ok).to.be.eq(true);

    // it('El endpoint /api/pets NO debería crear una mascota con datos vacíos', async () => {
    //   const petMock = {};

    //   const response = await request.post('/api/pets').send(petMock);
    //   const { status, ok, _body } = response;
    //   console.log({ status, ok, _body });

    //   expect(ok).to.be.eq(false);
    // });
  });
});

// npx mocha src/test/User.test.js
