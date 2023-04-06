import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';

import { Response } from 'superagent';
// import Users from '../database/models/Users.model';
// import User from '../database/services/User.service';

import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('get/matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
  });

  afterEach(() => {
    sinon.restore();
  })
  describe('Retornando sucesso na requisição', () => {
    it('Retorna status 200 - getAll (lista de partidas)', async () => {
      const matchesMock = [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          // "homeTeam": {
          //   "teamName": "São Paulo"
          // },
        },
        {
          "id": 2,
          "homeTeamId": 9,
          "homeTeamGoals": 1,
          "awayTeamId": 14,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "Internacional"
          },
          // "awayTeam": {
          //   "teamName": "Santos"
          // }
        },
        {
        }
        ];

      sinon.stub(Model, "findAll").resolves( matchesMock as Matches[]);

      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.eq(matchesMock);

    })
    it('retorna /matches:id com sucesso', async () => {
      const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY4MDgwNjEwNn0.3j4i9asWXFW2CuRVPC1WVnmXYyQKnT_yVvMnl1O6HDg'
 
      const insert = {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
      sinon.stub(Model, 'update');
      const chaiHttpResponse = await chai.request(app).patch('/matches/2').send(insert).set({'Authorization': tokenMock});

      expect(chaiHttpResponse.status).to.eq(200);
      expect(chaiHttpResponse.body).to.deep.eq({message:'The score has been changed'})
    });
  })

  describe('Retorno de erros e validações', () => {
    it('retorna status 401 se não tiver o token', async () => {
      const insert = {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
      sinon.stub(Model, 'findOne').resolves();
      chaiHttpResponse = await chai.request(app).patch('/matches/1').send({ insert });
      expect(chaiHttpResponse.status).to.eq(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        "message": "Token not found"
      })
    })
    it('retorna status 401 se o token tiver inválido',async () => {
      const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlc'
 
      const insert = {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
      sinon.stub(Model, 'update');
      const chaiHttpResponse = await chai.request(app).patch('/matches/2').send(insert).set({'Authorization': tokenMock});

      expect(chaiHttpResponse.status).to.eq(401);
      expect(chaiHttpResponse.body).to.deep.eq({message:'Token must be a valid token'})
    })

  })
  })
