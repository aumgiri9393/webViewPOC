import { linkBridge } from "@webview-bridge/web";
import { useBridge } from "@webview-bridge/react";
import { useState } from "react";
import type { AppBridge } from "../../App";

const bridge = linkBridge<AppBridge>({
  throwOnError: true,
  initialBridge: {
    sharedText: "",
    updateSharedTextFromWebView1: async (text) => {
      alert("WebView 1 not supported to update: " + text);
    },
    updateSharedTextFromWebView2: async (text) => {
      alert("WebView 2 not supported to update: " + text);
    },
  },
  onReady: () => {
    console.log("Bridge is ready");
  },
});

function SharedTextDisplay() {
  const sharedText = useBridge(bridge.store, (state) => state.sharedText);

  return (
    <div>
      <p>Shared Text from Native: {sharedText}</p>
    </div>
  );
}

function InputWebView() {
  const [text, setText] = useState("");

  return (
    <div>
      <p>WebView Input:</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <h2>This is the Web App</h2>
      <SharedTextDisplay />
      <InputWebView />
    </div>
  );
}

export default App;
