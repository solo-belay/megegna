import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const webviewRef = useRef(null);

  useEffect(() => {
    const handleBackPress = () => {
      if (webviewRef.current) {
        if (webviewRef.current.canGoBack()) {
          webviewRef.current.goBack();
          return true; // Indicate that we've handled the back press
        }
      }
      return false; // Let the default behavior happen
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove(); // Clean up event listener on unmount
  }, []);

  const handleSwipeDown = () => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  };

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: "http://www.megegna.com/" }}
      onSwipeDown={handleSwipeDown}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
