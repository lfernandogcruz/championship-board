import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';

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
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  it('If Login successful, returns status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'mscott@dunder-mifflin.com',
        password: '123456',
      });
    expect(chaiHttpResponse.status).to.equal(200);

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
});
