import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261031_154421_add_site from './20261031_154421_add_site';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261031_154421_add_site.up,
    down: migration_20261031_154421_add_site.down,
    name: '20261031_154421_add_site'
  },
];
