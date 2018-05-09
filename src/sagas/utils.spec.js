import expect from 'expect';
import sinon from 'sinon';
import { call, take, put } from 'redux-saga/effects';

import {
  createSubscriptionChan,
  subscribeAndDispatch,
} from './utils';

describe('saga:utils', () => {
  describe('subscribeAndDispatch', () => {
    const prepareQuery = q => q;
    const actionCreator = payload => ({ type: 'DUMMY_ACTION', payload });
    const saga = subscribeAndDispatch('path', 'event', actionCreator, prepareQuery);
    const gen = saga();
    it('should call createSubscriptionChan', () => {
      expect(gen.next().value).toEqual(
        call(createSubscriptionChan, 'path', 'event', prepareQuery)
      );
    });

    const channel = { close: sinon.spy(), take: sinon.spy() };

    it('should take into channel', () => {
      expect(gen.next(channel).value).toEqual(take(channel));
    });

    context('should run in infinite loop', () => {
      for (let i = 0; i < 3; i++) {
        it(`should put action [${i}]`, () => {
          const payload = { ok: true };
          expect(gen.next(payload).value).toEqual(
            put(actionCreator(payload))
          );
        });

        it(`should take channel value [${i}]`, () => {
          expect(gen.next(channel).value).toEqual(take(channel));
        });
      }
    });

    context('when saga is cancelled', () => {
      it('should call channel "close" method', () => {
        expect(gen.return().done).toBe(true);
        expect(channel.close.calledOnce).toBe(true);
      });
    });
  });
});
