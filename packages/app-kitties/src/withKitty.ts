import BN from 'bn.js';
import { Option, AccountId } from '@polkadot/types';
import { withCalls } from '@polkadot/ui-api/with';
import { Kitty } from './types';

export type Props = {
  kittyId: BN,
  kitty?: Option<Kitty>,
  owner?: Option<AccountId>
};

export default withCalls<Props>(
  ['query.kitties.kitties', { paramName: 'kittyId', propName: 'kitty' }],
  ['query.kitties.kittyOwners', { paramName: 'kittyId', propName: 'owner' }]
);
