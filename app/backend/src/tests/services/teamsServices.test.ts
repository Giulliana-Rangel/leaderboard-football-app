// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../../app';
// import { Model } from 'sequelize';

// import { Response } from 'superagent';

// import Teams from '../../database/models/Teams';
// import { teams, team } from '../mocks/teams.mock';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Team Service', () => {
//   let chaiHttpResponse: Response;

//   beforeEach(async () => {
//     sinon.stub(Model, "findAll")
//       .resolves(teams as Teams[]);
//   });

//   afterEach(() => {
//     (Teams.findAll as sinon.SinonStub).restore();
//   })

//    it('If endpoins "get/teams" return all', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .get('/teams');

//       expect(chaiHttpResponse.status).to.be.eq(200);
//       expect(chaiHttpResponse).to.be.an('array');
//       expect(chaiHttpResponse.body).to.be.deep.eq(teams);
//    });

//    it('If endpoins "get/teams" return all', async () => {
//     chaiHttpResponse = await chai
//     .request(app)
//     .get('/teams/1');

//     expect(chaiHttpResponse).to.be.eq(200);
//     expect(chaiHttpResponse.body[0]).to.be.deep.eq(teams[0]);
//    })


// });