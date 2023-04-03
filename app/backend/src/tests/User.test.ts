import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';

import { Response } from 'superagent';

import Users from '../database/models/Users.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/login', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
  });

  afterEach(() => {
    sinon.restore();
  })
    describe('Tratativa de erros', () => {
      it('retorna status 400 qdo login e senha não são informados', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({})
        expect(chaiHttpResponse.status).to.equal(400)
        expect(chaiHttpResponse.body).to.be.deep.eq( { message: 'All fields must be filled'})
      })
      it('retorna status 401 qdo a senha é informada erroneamente', async () => {
        const chaiHttpResponse = await chai.request(app).post('/login').send({ 
          email: 'user@users.com',
          password : '123'})
        expect(chaiHttpResponse.status).to.be.deep.eq(401)
        expect(chaiHttpResponse.body).to.be.deep.eq( { message: 'Invalid email or password'})
      })
      it('retorna status 401 qdo o email é informado erroneamente', async () => {
        const chaiHttpResponse = await chai.request(app).post('/login').send({ 
          email: 'user@users',
          password : '1234567'})
        expect(chaiHttpResponse.status).to.be.deep.eq(401)
        expect(chaiHttpResponse.body).to.be.deep.eq( { message: 'Invalid email or password'})
      })
    })
    describe('Requisições status(200), feita com sucesso!',() => {
      it('retorna status 200', async () => {
        const user = { id: 1, email: 'admin@admin.com', password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', role: 'admin', username: 'admin' };

        sinon.stub(Model, 'findOne').resolves(user as Users);

        const chaiHttpResponse = await chai.request(app).post('/login').send({ 
          email: 'admin@admin.com',
          password : "secret_admin"});

          expect(chaiHttpResponse.status).to.be.equal(200)
      })
    })
  });
