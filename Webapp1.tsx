import { BridgeStore, linkBridge } from '@webview-bridge/web';
import { useBridge } from '@webview-bridge/react';
import { AppBridgeState1 } from './Screen1';

const bridge = linkBridge<BridgeStore<AppBridgeState1>>({
  throwOnError: true,
  initialBridge: {
    count: 10,
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
    console.log('Webapp1 bridge is ready');
  },
});

function Count() {
  // render when only count changed
  const count = useBridge(bridge.store, (state) => state.count);

  return <p>Native Count: {count}</p>;
}

function DataText() {
  // render when only 'data.text' changed
  const text = useBridge(bridge.store, (state) => state.data.text);

  return (
    <div>
      <p>Native Data Text: {text}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => bridge.setDataText(e.target.value)}
      />
    </div>
  );
}

function Webapp1() {
  const increase = useBridge(bridge.store, (state) => state.increase);

  return (
    <div>
      <div>
        {`isWebViewBridgeAvailable: ${String(bridge.isWebViewBridgeAvailable)}`}
      </div>
      <h2>This is WebView1</h2>
      <button
        onClick={() => {
          if (bridge.isNativeMethodAvailable('openInAppBrowser') === true) {
            bridge.openInAppBrowser('https://github.com/gronxb/webview-bridge');
          }
        }}
      >
        open InAppBrowser
      </button>

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

export default Webapp1;
