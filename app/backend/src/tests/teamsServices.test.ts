import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';

import { Response } from 'superagent';

import Teams from '../database/models/Teams';
import { teams, team } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Service', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
  });

  afterEach(() => {
    sinon.restore();
  })

   it('If endpoints "get/teams" return allTeams', async () => {
    sinon.stub(Model, "findAll")
    .resolves(teams as Teams[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      // console.log('test', chaiHttpResponse);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.deep.eq(teams);
   });

   it('If endpoins "get/team/id" return byId', async () => {
    sinon.stub(Model, "findByPk")
    .resolves(team as Teams);

    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(team);
   })


});