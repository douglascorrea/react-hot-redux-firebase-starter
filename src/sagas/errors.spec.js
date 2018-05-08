import toastr from 'toastr';
import { takeEvery, call } from 'redux-saga/effects';
import expect from 'expect';

import errorsSaga, { printErrors } from './errors';

const errorAction = {
  type: 'ERROR_ACTION',
  error: true,
  payload: { message: 'MSG' },
};

const dummyAction = { type: 'DUMMY_ACTION', payload: {} };

describe('saga:errorsSaga', () => {
  const gen = errorsSaga();

  it('should take all actions', () => {
    expect(gen.next().value).toEqual(takeEvery('*', printErrors));
    expect(gen.next().done).toBe(true);
  });

  describe('printErrors', () => {
    context('when receive a normal action', () => {
      it('does nothing', () => {
        const gen = printErrors(dummyAction);
        expect(gen.next().done);
      });
    });

    context('when receive an error action', () => {
      it('call toastr.error with an error message', () => {
        const gen = printErrors(errorAction);
        expect(gen.next().value).toEqual(
          call(toastr.error, `[${errorAction.type}] ${errorAction.payload.message}`)
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
