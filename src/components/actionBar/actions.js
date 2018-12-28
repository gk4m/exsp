import {createAction} from 'redux-actions';
import {ACTION} from '@/redux/action';
import {Importer, Exporter} from '@/services';

export const doImport = createAction(ACTION.ACTION.IMPORT, async (data) => {
  return await Importer.doImport(data)
});

export const doExport = createAction(ACTION.ACTION.EXPORT, async (selected, type) => {
  return await Exporter.doExport(selected, type);
});
