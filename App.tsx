import React from 'react';
import {Animated, Dimensions, StyleSheet, View, ViewStyle, Easing} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const red = {key:'red', color: 'red', selectedDotColor: 'blue'};
const blue = {key:'blue', color: 'blue', selectedDotColor: 'blue'};
const green = {key:'green', color: 'green'};
const {width: screenWidth} = Dimensions.get('screen');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: 256,
  },
  block: {
    backgroundColor:'black',
    height: 32,
  },
});

const MSEC_IN_FRAME = 1000 / 60;
interface Props {
  progress: number;
  color: string;
  style: ViewStyle;
}


export default function App() {
  // const [width, setWidth] = React.useState(1);
  const [width] = React.useState(new Animated.Value(0));
  const [color] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(color, {
        toValue: 100,
        duration: 2500,
      }),

      Animated.sequence([
        Animated.spring(width, {
          toValue: 256,
          friction: 4,
        }),
        Animated.timing(width, {
          toValue: 0,
          duration: 1500,
          easing: Easing.bounce,
        }),
      ]),
    ]).start(() => {
      setTimeout(()=> {
        width.setValue(0)
        color.setValue(0)
      }, 100)
    });
  }, []);

  const backgroundColor = color.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgb(0, 128, 128)', 'rgb(128, 0, 128)'],
  });
  

  // React.useEffect(() => {
  //   const id = setInterval(() => {
  //     if (width < screenWidth - 64) {
  //       setWidth(width + 1);
  //     } else {
  //       clearInterval(id);
  //     }
  //   }, 1000 / 60);

    // return () => {
    //   clearInterval(id);
    // };
  // },[]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.block, {width, backgroundColor}]} />
    </View>
  );
}

  // render() {
  //   return (
  //     <View style={{marginTop: 20}}>
  //       <Calendar
  //         markedDates={{
  //           '2018-07-02': {dots: [red, blue, green]},
  //           '2018-07-03': {
  //             dots: [red, blue, green],
  //             selected: true,
  //             selectedColor: 'orange',
  //           },
  //           '2021-01-03': {
  //             dots: [red, blue, green],
  //             selected: true,
  //             selectedColor: 'orange',
  //           },
  //         }}
  //         markingType={'multi-dot'}
  //       />
  //       {/* <ProgressBar />
  //       <View style={styles.wrapper}>
  //         <ProgressBar styleAttr="Horizontal" />
  //       </View>
  //       <View style={styles.wrapper}>
  //         <ProgressBar
  //           styleAttr="Horizontal"
  //           indeterminate={false}
  //           progress={0.37}
  //         />
  //       </View> */}
  //     </View>

  //   );
  // }

// import React from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import {ProgressBar} from '@react-native-community/progress-bar-android';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.example}>
//         <Text>Circle Progress Indicator</Text>
//         <ProgressBar />
//       </View>
//       <View style={styles.example}>
//         <Text>Horizontal Progress Indicator</Text>
//         <ProgressBar styleAttr="Horizontal" />
//       </View>
//       <View style={styles.example}>
//         <Text>Colored Progress Indicator</Text>
//         <ProgressBar styleAttr="Horizontal" color="#2196F3" />
//       </View>
//       <View style={styles.example}>
//         <Text>Fixed Progress Value</Text>
//         <ProgressBar
//           styleAttr="Horizontal"
//           indeterminate={false}
//           progress={0.5}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   example: {
//     marginVertical: 24,
//   },
// });