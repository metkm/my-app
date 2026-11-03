import { ReactNode, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView, usePanGesture } from 'react-native-gesture-handler';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

const MyBall = ({ children }: { children: ReactNode }) => {
  const count = useSharedValue(0)

  useDerivedValue(() => count.value * 2)

  const something = () => {
    'worklet'
    console.log(count.value)
  }

  const gesture = usePanGesture({
    onBegin: () => {
      something()
    },
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>{children}</View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default function App() {
  const [bool, setBool] = useState(() => false)

  return (
    <MyBall>
      <Button title="rerender" onPress={() => setBool(x => !x)} />
      <Text style={{ fontSize: 14, marginTop: 50 }}>{`${bool}`}</Text>
    </MyBall>
  )
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }
});
