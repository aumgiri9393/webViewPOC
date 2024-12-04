import { BridgeStore, linkBridge } from '@webview-bridge/web';
import { useBridge } from '@webview-bridge/react';
import { AppBridgeState2 } from './Screen2';

// import type { AppBridge } from "@webview-bridge-example-shared-state-integration-react/react-native/types";

const bridge2 = linkBridge<BridgeStore<AppBridgeState2>>({
  throwOnError: true,
  initialBridge: {
    countInc: 10,
    data: {
      text: 'Test',
    },
    increase: async () => {
      alert('not support increase');
    },
    openInAppBrowser: async (url) => {
      alert('not support openInAppBrowser: ' + url);
    },
    setDataText: async (text) => {
      alert('not support setDataText: ' + text);
    },
    getMessage: async () => {
      return 'mocking message';
    },
  },
  onReady: () => {
    console.log('Webapp2 bridge is ready');
  },
});

function Count() {
  // render when only count changed
  const countInc = useBridge(bridge2.store, (state) => state.countInc);

  return <p>Native Count: {countInc}</p>;
}

function DataText() {
  // render when only 'data.text' changed
  const text = useBridge(bridge2.store, (state) => state.data.text);

  return (
    <div>
      <p>Native Data Text: {text}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => bridge2.setDataText(e.target.value)}
      />
    </div>
  );
}

function Webapp2() {
  const increase = useBridge(bridge2.store, (state) => state.increase);

  return (
    <div>
      <div>
        {`isWebViewBridgeAvailable: ${String(bridge2.isWebViewBridgeAvailable)}`}
      </div>
      <h2>This is WebView2</h2>
      {/* <button
        onClick={() => {
          if (bridge2.isNativeMethodAvailable('openInAppBrowser') === true) {
            bridge2.openInAppBrowser('https://github.com/gronxb/webview-bridge');
          }
        }}
      >
        open InAppBrowser
      </button> */}

      <Count />
      <button
        onClick={() => {
          increase(); // or bridge.increase()
        }}
      >
        Increase from web
      </button>

      <DataText />
    </div>
  );
}

export default Webapp2;
