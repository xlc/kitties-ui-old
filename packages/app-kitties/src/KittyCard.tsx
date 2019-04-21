import React from 'react';
import styled from 'styled-components';
import { AddressMini, TxButton } from '@polkadot/ui-app';
import { u8aToHex, formatBalance } from '@polkadot/util';
import { Option, Balance } from '@polkadot/types';

import KittyAvatar from './KittyAvatar';
import withKitty, { Props as WithKittyProps } from './withKitty';

const Wrapper = styled.div`
  border: 2px solid #eee;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  width: 333px;
`;

const StyledKittyAvatar = styled(KittyAvatar)`
  margin: auto;
`;

const Line = styled.div`
  height: 2px;
  background: #eee;
  margin: 10px -10px;
`;

type Props = WithKittyProps & {
  showUnlist?: boolean,
  accountId?: string
};

const Price = ({ kittyId, price, showUnlist, accountId }: Props) => {
  if (price && price.isSome) {
    const value = price.unwrap();
    return (
      <>
        <label>Price: {formatBalance(value)}</label>
        {showUnlist &&
          <TxButton
            accountId={accountId}
            label='Unlist'
            params={[kittyId, new Option(Balance, null)]}
            tx='kitties.ask'
          />
        }
      </>
    );
  }

  return <label>Not for sale</label>;
};

const KittyCard = ({ kittyId, kitty, owner, price, showUnlist, accountId }: Props) => {
  if (kitty && kitty.isSome) {
    const dna = kitty.unwrap().dna;
    return (
      <Wrapper>
        <StyledKittyAvatar dna={dna} />
        <Line />
        <label>Kitty ID: {kittyId.toString()}</label>
        <label>
          Owner:
          <AddressMini
            value={owner && owner.unwrap()}
          />
        </label>
        <label>DNA: {u8aToHex(dna)}</label>
        <Price {...{ kittyId, price, showUnlist, accountId }}/>
      </Wrapper>
    );
  }
  return <div>Loading...</div>;
};

export default withKitty(KittyCard) as React.ComponentType<Props>;
