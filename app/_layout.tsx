import { Stack } from "expo-router";


export default function RootLayout() {
  return <Stack>
            <Stack.Screen 
              name="index" 
              options={{ title: "Pok Mania" }} />
            <Stack.Screen 
              name="details"
              options={{ 
              headerBackButtonDisplayMode: "minimal",
              presentation: "formSheet",
              sheetAllowedDetents: [0.64, 0.9],
              sheetCornerRadius: 20,
              sheetGrabberVisible: true,
              }} />
          </Stack>;
}
