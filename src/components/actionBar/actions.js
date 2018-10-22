import { createAction } from 'redux-actions';
import { ACTION } from '@/redux/action';
import {Importer} from '@/services';

export const doImport = createAction(ACTION.IMPORT, async (data) => {
  return await Importer.doImport(data)
});

