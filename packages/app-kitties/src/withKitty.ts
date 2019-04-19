import BN from 'bn.js';
import { Option } from '@polkadot/types/codec';
import { withCalls } from '@polkadot/ui-api/with';
import { Kitty } from './types';

export type Props = {
  kittyId: BN,
  kitties_kitties?: Option<Kitty>
};

export default withCalls<Props>(['query.kitties.kitties', { paramName: 'kittyId' }]);
