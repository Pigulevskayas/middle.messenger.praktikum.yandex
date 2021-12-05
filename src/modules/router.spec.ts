import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Router from './router';
import Block from './block';

declare global {
	namespace NodeJS {
		interface Global {
			document: Document;
			window: Window;
			navigator: Navigator;
		}
	}
}

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>', {
  	url: 'http://localhost:3000/',
});

(global as any).window = dom.window;
(global as any).document = dom.window.document;

const should = require('chai').should();

// @ts-ignore
const keys = [
	'DocumentFragment',
	'Event',
	'KeyboardEvent',
	'MouseEvent',
];
// @ts-ignore
keys.forEach((key) => {
  	// @ts-ignore
  	global[key] = document.defaultView[key];
});
// @ts-ignore
global.self = document.defaultView;

describe('Checking Router', () => {
  	it('Switching the routes check', () => {
	    window.history.pushState({ page: 'sign-in' }, 'Sign in', '/');
	    expect(window.location.pathname).to.eq('/');
	    window.history.pushState({ page: 'sign-up' }, 'Sign up', '/sign-up');
	    expect(window.location.pathname).to.eq('/sign-up');
	    expect(window.history.length).to.eq(3);
  	});

  	it('Router can be created', () => {
  		// @ts-ignore
  		const router = new Router();
    	// @ts-ignore
    	const testBlock = new Block('div', {});
    	// @ts-ignore
    	router.use('/', testBlock);
    	should.exist(Router);
  	});

  	it('Route can be added', () => {
  		// @ts-ignore
  		const router = new Router();
    	// @ts-ignore
    	const testBlock = new Block('div', {});
    	// @ts-ignore
    	router.use('/', testBlock);
    	expect(router).to.have.property('routes');
    	// assert.lengthOf(router.routes, 1, 'Route is successfully added, length is 1');
  	});
});
