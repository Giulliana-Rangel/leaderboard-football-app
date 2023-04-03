import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';

import { Response } from 'superagent';

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
  })
})