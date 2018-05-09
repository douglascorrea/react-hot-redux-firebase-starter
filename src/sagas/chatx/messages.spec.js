import { select, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import expect from 'expect';

import api from '../../api/firebase';
import { getCurrentUserUID } from '../../selectors/authSelectors';
import { sendMessage } from '../../actions/chatxActions';

import { sendSaga } from './messages';

const userId = 'user1';
const roomId = 'room1';
const msg = 'hello';
const messageAction = {
  type: `${sendMessage}`,
  payload: { room: roomId, message: msg },
};

describe('saga:chatx:messages', () => {
  describe('sendSaga', () => {
    const gen = cloneableGenerator(sendSaga)(messageAction);

    it('should select current user id', () => {
      expect(gen.next().value).toEqual(select(getCurrentUserUID));
    });

    it('should call databasePush with room and newMessage', () => {
      expect(gen.next(userId).value).toEqual(
        call(
          api.databasePush,
          `/messages/${roomId}/`,
          {
            content: msg,
            author: userId,
            createdAt: api.SERVER_TIMESTAMP,
          },
        )
      );
    });

    context('when api does not throw', () => {
      it('should end saga', () => {
        expect(gen.clone().next().done).toBe(true);
      });
    });

    context('when api throw an error', () => {
      it('should end saga', () => {
        const error = new Error('[ERROR]');
        expect(gen.clone().throw(error).value).toEqual(
          put(sendMessage(error))
        );
      });
    });
  });
});
