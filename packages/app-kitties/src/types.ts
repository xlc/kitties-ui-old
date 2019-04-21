import { U32, U128 } from '@polkadot/types/primitive';
import { Struct, Option } from '@polkadot/types/codec';

export class Kitty extends U128 {
  get dna (): Uint8Array {
    return this.toU8a();
  }
}

export class KittyIndex extends U32 {
}

export class KittyLinkedItem extends Struct {
  constructor (value: any) {
    super({
      prev: Option.with(KittyIndex),
      next: Option.with(KittyIndex)
    }, value);
  }

  get prev (): Option<KittyIndex> {
    return this.get('prev') as Option<KittyIndex>;
  }

  get next (): Option<KittyIndex> {
    return this.get('next') as Option<KittyIndex>;
  }
}
