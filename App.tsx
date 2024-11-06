import React, { useState } from "react";
import { Button, Text, SafeAreaView, View, TextInput } from "react-native";
import {
  createWebView,
  type BridgeWebView,
  bridge,
  useBridge,
  type Bridge,
} from "@webview-bridge/react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

interface AppBridgeState extends Bridge {
  getMessage(): Promise<string>;
  openInAppBrowser(url: string): Promise<void>;
  sharedText: string; // Single shared state for both WebViews
  updateSharedTextForWebView1(text: string): Promise<void>; // Update function for WebView 1
  updateSharedTextForWebView2(text: string): Promise<void>; // Update function for WebView 2
}

export const appBridge = bridge<AppBridgeState>(({ get, set }) => ({
  async getMessage() {
    return "I'm from native" as const;
  },
  async openInAppBrowser(url: string) {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    }
  },

  sharedText: "", // Initial shared text value

  async updateSharedTextForWebView1(text) {
    set({
      sharedText: `WebView 1: ${text}`, 
    });
  },

  async updateSharedTextForWebView2(text) {
    set({
      sharedText: `WebView 2: ${text}`,
    });
  },
}));

export const { WebView, linkWebMethod } = createWebView({
  bridge: appBridge,
  debug: true,
  fallback: (method) => {
    console.warn(`Method '${method}' not found in native`);
  },
});

function SharedTextDisplay() {
  // Render the shared text when it changes
  const sharedText = useBridge(appBridge, (state) => state.sharedText);
  return (
    <View style={{ alignItems: "center", margin: 10 }}>
      <Text>Shared Text: {sharedText}</Text>
    </View>
  );
}

function NativeInput() {
  const [text, setText] = useState("");

  const updateSharedTextForWebView1 = useBridge(appBridge, (state) => state.updateSharedTextForWebView1);
  const updateSharedTextForWebView2 = useBridge(appBridge, (state) => state.updateSharedTextForWebView2);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter shared text"
        style={{ borderWidth: 1, minWidth: "50%", maxWidth: "50%", marginBottom: 10 }}
      />

      {/* Buttons to send text to WebView 1 or WebView 2 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
        <Button
          title="Send to WebView 1"
          onPress={() => updateSharedTextForWebView1(text)}
        />
        <Button
          title="Send to WebView 2"
          onPress={() => updateSharedTextForWebView2(text)}
        />
      </View>
    </View>
  );
}

export type AppBridge = typeof appBridge;

function App(): JSX.Element {
  const webviewRef = React.useRef<BridgeWebView>(null);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      {/* WebView 1 */}
      <WebView
        ref={webviewRef}
        source={{
          uri: "http://localhost:5173", // Same URL for both WebViews
        }}
        style={{ height: "25%", width: "100%" }}
      />

      {/* WebView 2 */}
      <WebView
        ref={webviewRef}
        source={{
          uri: "http://localhost:5173", // Same URL for both WebViews
        }}
        style={{ height: "25%", width: "100%" }}
      />

      <SharedTextDisplay />

      <NativeInput />
    </SafeAreaView>
  );
}

export default App;
