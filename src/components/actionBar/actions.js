import { createAction } from 'redux-actions';
import { ACTION } from '@/redux/action';
import { Importer, Exporter } from '@/services';

export const doImport = createAction(
  ACTION.ACTION.IMPORT,
  async (data) => { await Importer.doImport(data); },
);

export const doExport = createAction(
  ACTION.ACTION.EXPORT,
  async (selected, type) => { await Exporter.doExport(selected, type); },
);
