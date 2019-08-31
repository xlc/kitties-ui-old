// Copyright 2017-2019 @polkadot/apps authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import settings from '@polkadot/ui-settings';
import '@polkadot/ui-app/i18n';
import '@polkadot/ui-app/styles';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import store from 'store';
import { getTypeRegistry } from '@polkadot/types';
import { Api } from '@polkadot/ui-api';

import { QueueConsumer } from '@polkadot/ui-app/Status/Context';
import Queue from '@polkadot/ui-app/Status/Queue';
import Apps from './Apps';

const hijackSettings = () => {
  const ENDPOINT_DEFAULT = 'wss://substrate-kitty-rpc.kusamakitties.network';
  const ENDPOINTS = [
    { text: 'Substrate Kitties Hosted Testnet', value: ENDPOINT_DEFAULT },
    { text: 'Local Node (127.0.0.1:9944)', value: 'ws://127.0.0.1:9944/' }
  ];
  const storedSettings = store.get('settings') || {};
  const anySettings = settings as any;
  anySettings._apiUrl = storedSettings.apiUrl || ENDPOINT_DEFAULT;
  Object.defineProperty(anySettings, 'availableNodes', { value: ENDPOINTS });
};

hijackSettings();

const rootId = 'root';
const rootElement = document.getElementById(rootId);
const url = process.env.WS_URL || settings.apiUrl || undefined;

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

console.log('Web socket url=', url);

try {
  const types = store.get('types') || {};
  const names = Object.keys(types);

  if (names.length) {
    getTypeRegistry().register(types);
    console.log('Type registration:', names.join(', '));
  }
} catch (error) {
  console.error('Type registration failed', error);
}

ReactDOM.render(
  <Suspense fallback='...'>
    <Queue>
      <QueueConsumer>
        {({ queueExtrinsic, queueSetTxStatus }) => (
          <Api
            queueExtrinsic={queueExtrinsic}
            queueSetTxStatus={queueSetTxStatus}
            url={url}
          >
            <HashRouter>
              <Apps />
            </HashRouter>
          </Api>
        )}
      </QueueConsumer>
    </Queue>
  </Suspense>,
  rootElement
);
