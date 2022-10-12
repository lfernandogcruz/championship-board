import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';
import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';
import LeaderboardService from '../database/services/Leaderboard.service';
import ILeaderboard from '../database/interfaces/ILeaderboard';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing the Login route', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(User, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as User);
  // });
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: 'secret_user',
      } as User);
  });

  // after(()=>{
  //   (User.findOne as sinon.SinonStub).restore();
  // })
  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  it('If Login successful, returns a token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'User',
        password: 'secret_user',
      });
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});

describe('Testing the Teams route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findOne")
      .resolves({
        id: 1,
        teamName: 'Tabajara FC',
      } as Teams);
  });

  after(()=>{
    (Teams.findOne as sinon.SinonStub).restore();
  });

  it('If /teams returns list of teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('If /teams returns list of teams with correct properties', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });

  it('If id doesn\'t exist, returns status 404', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/100');
    expect(chaiHttpResponse.status).to.equal(404);
  });

  it('If /teams/:id is successful, returns status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('If /teams/:id returns correct team', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    expect(chaiHttpResponse.body).to.have.property('id', 1);
    expect(chaiHttpResponse.body).to.have.property('teamName', 'Tabajara FC');
  });
});

describe('Testing the Matches route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findOne")
      .resolves({
        id: 1,
        homeTeam: 1,
        homeTeamGoals: 2,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: false,
      } as Matches);
  });

  after(()=>{
    (Matches.findOne as sinon.SinonStub).restore();
  });

  it('If successful, returns status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('If /matches returns list of matches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('If /matches/:id is successful, returns status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches/1');
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('If /matches/:id returns correct team', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches/1');
    expect(chaiHttpResponse.body).to.have.property('id', 1);
    expect(chaiHttpResponse.body).to.have.property('homeTeam', 1);
    expect(chaiHttpResponse.body).to.have.property('homeTeamGoals', 2);
    expect(chaiHttpResponse.body).to.have.property('awayTeam', 2);
    expect(chaiHttpResponse.body).to.have.property('awayTeamGoals', 1);
    expect(chaiHttpResponse.body).to.have.property('inProgress', false);
  });
});

// describe('Testing the Leaderboard route', () => {
//   let chaiHttpResponse: Response;

//   before(async () => sinon.stub(LeaderboardService.prototype, 'homeFindAll')
//     .resolves([
//       {
//         name: 'Tabajara FC',
//         totalPoints: 7,
//         totalGames: 12,
//         totalVictories: 1,
//         totalDraws: 4,
//         totalLosses: 7,
//         goalsFavor: 3,
//         goalsOwn: 15,
//         goalsBalance: 0,
//         efficiency: 0.08,
//       },
//       {
//         name: 'Ibis FC',
//         totalPoints: 5,
//         totalGames: 12,
//         totalVictories: 1,
//         totalDraws: 2,
//         totalLosses: 9,
//         goalsFavor: 2,
//         goalsOwn: 21,
//         goalsBalance: 0,
//         efficiency: 0.04,
//       },
//     ]));

//   after(()=>{
//     (LeaderboardService.prototype.homeFindAll as sinon.SinonStub).restore();
//   });

//   it('If /leaderboard/home is successful, returns status 200', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .get('/leaderboard/home');
//     expect(chaiHttpResponse.status).to.equal(200);
//   });

//   it('If /leaderboard returns correct teams', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .get('/leaderboard/home');
//     expect(chaiHttpResponse.body[0]).to.have.property('id', 1);
//     expect(chaiHttpResponse.body[0]).to.have.property('teamName', 'Tabajara FC');
//     expect(chaiHttpResponse.body[0]).to.have.property('points', 3);
//     expect(chaiHttpResponse.body[1]).to.have.property('id', 2);
//     expect(chaiHttpResponse.body[1]).to.have.property('teamName', 'Ibis FC');
//     expect(chaiHttpResponse.body[1]).to.have.property('points', 1);
//   });

//   it('Tests the LeaderboardService homeFindAll method', async () => {
//     const leaderboardService = new LeaderboardService();
//     const leaderboard = await leaderboardService.homeFindAll() as ILeaderboard[];
//     expect(leaderboard[0]).to.have.property('name', 'Tabajara FC');
//     expect(leaderboard[0]).to.have.property('totalPoints', 7);
//     expect(leaderboard[0]).to.have.property('totalGames', 12);
//     expect(leaderboard[0]).to.have.property('totalVictories', 1);
//     expect(leaderboard[0]).to.have.property('totalDraws', 4);
//     expect(leaderboard[0]).to.have.property('totalLosses', 7);
//     expect(leaderboard[0]).to.have.property('goalsFavor', 3);
//     expect(leaderboard[0]).to.have.property('goalsOwn', 15);
//     expect(leaderboard[0]).to.have.property('goalsBalance', 0);
//     expect(leaderboard[0]).to.have.property('efficiency', 0.08);
//     expect(leaderboard[1]).to.have.property('name', 'Ibis FC');
//     expect(leaderboard[1]).to.have.property('totalPoints', 5);
//     expect(leaderboard[1]).to.have.property('totalGames', 12);
//     expect(leaderboard[1]).to.have.property('totalVictories', 1);
//     expect(leaderboard[1]).to.have.property('totalDraws', 2);
//     expect(leaderboard[1]).to.have.property('totalLosses', 9);
//     expect(leaderboard[1]).to.have.property('goalsFavor', 2);
//     expect(leaderboard[1]).to.have.property('goalsOwn', 21);
//     expect(leaderboard[1]).to.have.property('goalsBalance', 0);
//     expect(leaderboard[1]).to.have.property('efficiency', 0.04);
//   });
// });
