import "./App.css";
import { BridgeStore, linkBridge } from "@webview-bridge/web";
import { useBridge } from "@webview-bridge/react";
import { useEffect, useState } from "react";
import React from "react";
import Webapp1 from "../../Webapp1";
import Webapp2 from '../../Webapp2';
import Webapp3 from '../../Webapp3'
import { FeatureWebViewBridge } from "../../useWebViewBridge";

const bridge = linkBridge<BridgeStore<FeatureWebViewBridge>>({
  throwOnError: true,
  onReady: () => {
    console.log("app bridge is ready");
  },
});

function App() {
  const feature = useBridge(bridge.store,(state)=> state.feature)
  console.log("Feature: ",feature)
  return (
    <>
    {
      feature==='web_app2'? <Webapp2/>
    :
    feature==='web_app1'? <Webapp1/> : 
    feature==='web_app3'? <Webapp3/>:<div>No feature selected</div>
    }
    {/* <Webapp2/> */}
     </>
  );
}
export default App;