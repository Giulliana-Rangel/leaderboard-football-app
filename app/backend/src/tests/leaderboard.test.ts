import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('get/leaderboard', () => {
  let chaiHttpResponse: Response;

  // beforeEach(() => {
  //  });

  afterEach(() => {
    sinon.restore();
  })
  it('If returns leaderboard/home list', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('Return leaderboard/home list', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('Return leaderboard/away list', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
  })  
})
