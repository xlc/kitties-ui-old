import BN from 'bn.js';
import { Option, AccountId, Balance } from '@polkadot/types';
import { withCalls } from '@polkadot/ui-api/with';
import { Kitty } from './types';

export type Props = {
  kittyId: BN,
  kitty?: Option<Kitty>,
  owner?: Option<AccountId>,
  price?: Option<Balance>
};

export default withCalls<Props>(
  ['query.kitties.kitties', { paramName: 'kittyId', propName: 'kitty' }],
  ['query.kitties.kittyOwners', { paramName: 'kittyId', propName: 'owner' }],
  ['query.kitties.kittyPrices', { paramName: 'kittyId', propName: 'price' }]
);
