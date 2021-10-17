import HTTPTransport from './fetch';
import { expect } from 'chai';
import * as sinon from 'sinon';

describe('Testing HTTPTransport class', () => {
  it('Checking GET method', ()  => {
    const HTTPTransportTest = new HTTPTransport('');
    const requestTest = sinon.spy(HTTPTransportTest, 'request');
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
    const HTTPTransportTest = new HTTPTransport('');
    const requestTest = sinon.spy(HTTPTransportTest, 'request');
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
    const HTTPTransportTest = new HTTPTransport('');
    const requestTest = sinon.spy(HTTPTransportTest, 'request');
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
    const HTTPTransportTest = new HTTPTransport('');
    const requestTest = sinon.spy(HTTPTransportTest, 'request');
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
