import React from "react";
import { StyleSheet } from "react-native";
// @ts-ignore
import { WebView as _WebView } from "react-native-web-webview";

export const WebView = () => {
  return (
    <_WebView
      style={stylesheet.container}
      source={{ uri: "https://www.sfcenter.org/calendar/" }}
      // only render the main (<main>...</main>) content of the page
      injectedJavaScript="
        const main = document.querySelector('main');
        document.body.innerHTML = main.innerHTML;
      "
    />
  );
};

const stylesheet = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "100%",
  },
});
