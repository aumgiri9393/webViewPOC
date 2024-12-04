import { BridgeStore, createWebView } from '@webview-bridge/react-native';
import { useCallback, useMemo } from 'react';
import { Bridge } from '@webview-bridge/web';

export interface FeatureWebViewBridge extends Bridge {
  feature: 'web_app1' | 'web_app2' | 'web_app3';
}

interface WebViewBridgeProps<T extends FeatureWebViewBridge> {
  appBridge: BridgeStore<T>;
  webviewRef?: any;
}

export default function useWebViewBridge<T extends FeatureWebViewBridge>(
  props: WebViewBridgeProps<T>
) {
  const {
    appBridge,
    webviewRef,
  } = props;

  const { WebView } = useMemo(() => createWebView({
    bridge: appBridge,
    debug: true,
    fallback: (method) => {
      console.warn(`Method '${String(method)}' not found in native`);
    },
  }), [appBridge]);

  const WebViewWithBridge = useCallback(() => (
    <WebView
        ref={webviewRef}
        source={{
          uri: 'http://localhost:5173',
        }}
        style={{ height: '50%', width: '100%' }}
      />
  ), [webviewRef, WebView]);

  return { WebViewWithBridge };
}
