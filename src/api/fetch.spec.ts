import HTTPTransport from './fetch';
import { expect } from 'chai';
import * as sinon from 'sinon';

const HTTPTransportTest = new HTTPTransport('');
const requestTest = sinon.spy(HTTPTransportTest, 'request');

describe('Testing HTTPTransport class', () => {
  it('Checking GET method', ()  => {
    HTTPTransportTest.get('/check');
    expect(requestTest.calledWith('https://ya-praktikum.tech/api/v2/check', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'credentials': 'include',
      }
    })).to.be.ok;
  });

  it('Checking POST method', ()  => {
    HTTPTransportTest.post('/check');
    expect(requestTest.calledWith('https://ya-praktikum.tech/api/v2/check', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'credentials': 'include',
      }
    })).to.be.ok;
  });

  it('Checking PUT method', ()  => {
    HTTPTransportTest.put('/check');
    expect(requestTest.calledWith('https://ya-praktikum.tech/api/v2/check', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'credentials': 'include',
      }
    })).to.be.ok;
  });

  it('Checking DELETE method', ()  => {
    HTTPTransportTest.delete('/check');
    expect(requestTest.calledWith('https://ya-praktikum.tech/api/v2/check', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'credentials': 'include',
      }
    })).to.be.ok;
  });
});
