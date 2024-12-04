import { useBridge } from '@webview-bridge/react';
import React from 'react';
import { bridge, BridgeWebView } from '@webview-bridge/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Button, SafeAreaView, Text, View } from 'react-native';
import useWebViewBridge, { FeatureWebViewBridge } from './useWebViewBridge';

export interface AppBridgeState3 extends FeatureWebViewBridge{
  getMessage(): Promise<string>;
  increase(): Promise<void>;
  count3: number;
}

export const appBridge3 = bridge<AppBridgeState3>(({ get, set }) => ({
  feature:'web_app3',
  async getMessage() {
    return "I'm from native" as const;
  },
  async openInAppBrowser(url: string) {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    }
  },
  data: {
    text: '',
  },
  count3: 0,
  async increase() {
    set({
      count3: get().count3 + 1,
    });
  },
}));



function Count() {
  // render when count changed
  const count3 = useBridge(appBridge3, (state) => state.count3);

  return <Text>Native Count: {count3}</Text>;
}


function Screen3() {
  const webviewRef = React.useRef<BridgeWebView>(null);

  const increase = useBridge(appBridge3, (state) => state.increase);
  const {WebViewWithBridge} = useWebViewBridge({appBridge:appBridge3, webviewRef});

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <WebViewWithBridge
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '50%',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 10 }}>
          This is Native3
        </Text>

        <Count />
        <Button onPress={() => increase()} title="Increase From Native3" />
      </View>
    </SafeAreaView>
  );

}

export default Screen3;
