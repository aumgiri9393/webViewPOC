import { BridgeStore, linkBridge } from '@webview-bridge/web';
import { useBridge } from '@webview-bridge/react';
import { AppBridgeState3 } from './Screen3';

const bridge3 = linkBridge<BridgeStore<AppBridgeState3>>({
  throwOnError: true,
  initialBridge: {
    count3: 10,
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
    console.log('Webapp3 bridge is ready');
  },
});

function Count() {
  // render when only count changed
  const count3 = useBridge(bridge3.store, (state) => state.count3);

  return <p>Native Count: {count3}</p>;
}

function Webapp3() {
  const increase = useBridge(bridge3.store, (state) => state.increase);

  return (
    <div>
      <div>
        {`isWebViewBridgeAvailable: ${String(bridge3.isWebViewBridgeAvailable)}`}
      </div>
      <h2>This is WebView3</h2>

      <Count />
      <button
        onClick={() => {
          increase();
        }}
      >
        Increase from web
      </button>
    </div>
  );
}

export default Webapp3;
