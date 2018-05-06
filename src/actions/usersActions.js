import { createAction } from 'redux-actions';

export const addedUser = createAction('ADDED_USER');
export const removedUser = createAction('REMOVED_USER');
export const changedUser = createAction('CHANGED_USER');
