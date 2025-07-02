import { Slot, Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { COLORS } from "@/constants/Colors";
import SafeScreen from "@/components/SafeScreen";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#d60da0" }}>
        <Slot />
      </SafeAreaView>
    </ClerkProvider>
  );
}
