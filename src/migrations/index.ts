import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261031_154421_add_site from './20261031_154421_add_site';
import * as migration_20261101_024904_add_gamsgo from './20261101_024904_add_gamsgo';
import * as migration_20261101_024919_drop_inquiries from './20261101_024919_drop_inquiries';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261031_154421_add_site.up,
    down: migration_20261031_154421_add_site.down,
    name: '20261031_154421_add_site',
  },
  {
    up: migration_20261101_024904_add_gamsgo.up,
    down: migration_20261101_024904_add_gamsgo.down,
    name: '20261101_024904_add_gamsgo',
  },
  {
    up: migration_20261101_024919_drop_inquiries.up,
    down: migration_20261101_024919_drop_inquiries.down,
    name: '20261101_024919_drop_inquiries'
  },
];
