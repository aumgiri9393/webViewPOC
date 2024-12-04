// import "./App.css";
import { useBridge } from '@webview-bridge/react';

// import { AppBridge } from "../../App";
// import Linechart from "./Linechart";
// import { useEffect, useState } from 'react';
import React from 'react';
// import Webapp2 from './Webapp2';
import { bridge, BridgeWebView } from '@webview-bridge/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import useWebViewBridge, { FeatureWebViewBridge } from './useWebViewBridge';

export interface AppBridgeState1 extends FeatureWebViewBridge{
  getMessage(): Promise<string>;
  openInAppBrowser(url: string): Promise<void>;
  count: number;
  increase(): Promise<void>;
  data: {
    text: string;
  };
  bridgeType: string;
  setBridgeType(text: string): Promise<void>;
  setDataText(text: string): Promise<void>;
}

export const appBridge1 = bridge<AppBridgeState1>(({ get, set }) => ({
  feature:'web_app1',
  async getMessage() {
    return "I'm from native" as const;
  },
  async openInAppBrowser(url: string) {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    }
  },
  bridgeType: '',
  async setBridgeType(text){
    set({
      bridgeType: text,
    });
  },
  data: {
    text: '',
  },
  count: 0,
  async increase() {
    set({
      count: get().count + 1,
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
  const count = useBridge(appBridge1, (state) => state.count);

  return <Text>Native Count: {count}</Text>;
}

function Input() {
  const { data, setDataText } = useBridge(appBridge1);

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


function Screen1() {
  const webviewRef = React.useRef<BridgeWebView>(null);

  const increase = useBridge(appBridge1, (state) => state.increase);
  const {WebViewWithBridge} = useWebViewBridge({appBridge:appBridge1,webviewRef});

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
          This is Native1
        </Text>

        <Count />
        <Button onPress={() => increase()} title="Increase From Native" />

        <Input />
      </View>
    </SafeAreaView>
  );

}

export default Screen1;
