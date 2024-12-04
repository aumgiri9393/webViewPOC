import { useBridge } from '@webview-bridge/react';
import React from 'react';
import { bridge, BridgeWebView } from '@webview-bridge/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import useWebViewBridge, { FeatureWebViewBridge } from './useWebViewBridge';

export interface AppBridgeState2 extends FeatureWebViewBridge{
  getMessage(): Promise<string>;
  increase(): Promise<void>;
  data: {
    text: string;
  };
  setDataText(text: string): Promise<void>;
  countInc: number;
}

export const appBridge2 = bridge<AppBridgeState2>(({ get, set }) => ({
  feature:'web_app2',
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
  countInc: 0,
  async increase() {
    set({
      countInc: get().countInc + 1,
    });
  },
  async setDataText(text) {
    set({
      data: {
        text,
      },
    });
  },
}));



function Count() {
  // render when count changed
  const countInc = useBridge(appBridge2, (state) => state.countInc);

  return <Text>Native Count: {countInc}</Text>;
}

function Input() {
  const { data, setDataText } = useBridge(appBridge2);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        Native Data Text: {data.text}
      </Text>
      <TextInput
        value={data.text}
        onChangeText={setDataText}
        style={{ borderWidth: 1, minWidth: '50%', maxWidth: '50%' }}
      />
    </View>
  );
}


function Screen2() {
  const webviewRef = React.useRef<BridgeWebView>(null);

  const increase = useBridge(appBridge2, (state) => state.increase);
  const {WebViewWithBridge} = useWebViewBridge({appBridge:appBridge2, webviewRef});

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
          This is Native2
        </Text>

        <Count />
        <Button onPress={() => increase()} title="Increase From Native2" />

        <Input />
      </View>
    </SafeAreaView>
  );

}

export default Screen2;
