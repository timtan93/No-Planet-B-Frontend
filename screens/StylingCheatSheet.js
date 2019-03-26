// //This is an example code to show image in a button//
// import React, { Component } from "react";
// //import react in our code.

// import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
// //import all the components we are going to use.

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.MainContainer}>
//         <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
//           {/*We can use any component which is used to shows something inside
//              TouchableOpacity. It shows the item inside in horizontal orientation */}
//           <Image
//             //We are showing the Image from online
//             source={{
//               uri:
//                 "http://aboutreact.com/wp-content/uploads/2018/08/facebook.png.png"
//             }}
//             //You can also show the image from you project directory like below
//             //source={require('./Images/facebook.png')}
//             //Image Style
//             style={styles.ImageIconStyle}
//           />
//           <View style={styles.SeparatorLine} />
//           <Text style={styles.TextStyle}> Login Using Facebook </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5}>
//           <Image
//             //We are showing the Image from online
//             source={{
//               uri:
//                 "http://aboutreact.com/wp-content/uploads/2018/08/google-plus.png"
//             }}
//             //You can also show the image from you project directory like below
//             //source={require('./Images/google-plus.png')}
//             //Image Style
//             style={styles.ImageIconStyle}
//           />
//           <View style={styles.SeparatorLine} />
//           <Text style={styles.TextStyle}> Login Using Google Plus </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 10
//   },
//   GooglePlusStyle: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#dc4e41",
//     borderWidth: 0.5,
//     borderColor: "#fff",
//     height: 40,
//     width: 220,
//     borderRadius: 5,
//     margin: 5
//   },
//   FacebookStyle: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#485a96",
//     borderWidth: 0.5,
//     borderColor: "#fff",
//     height: 40,
//     width: 220,
//     borderRadius: 5,
//     margin: 5
//   },
//   ImageIconStyle: {
//     padding: 10,
//     margin: 5,
//     height: 25,
//     width: 25,
//     resizeMode: "stretch"
//   },
//   TextStyle: {
//     color: "#fff",
//     marginBottom: 4,
//     marginRight: 20
//   },
//   SeparatorLine: {
//     backgroundColor: "#fff",
//     width: 1,
//     height: 40
//   }
// });
// import React, { Component } from "react";
// import ImageLayout from "react-native-image-layout";

// export default class Map extends React.Component {
//   render() {
//     return (
//       <ImageLayout
//         images={[
          // Version *3.0.0 update (or greater versions):
          // Can be used with different image object fieldnames.
          // Ex. source, source.uri, uri, URI, url, URL
          // {
          //   uri:
          //   "https://wkkrqsriursybsor-zippykid.netdna-ssl.com/wp-content/uploads/2017/05/coca-cola.jpg"
          // },
          // { source: require("yourApp/image.png"),
          // IMPORTANT: It is REQUIRED for LOCAL IMAGES
          // to include a dimensions field with the
          // actual width and height of the image or
          // it will throw an error.
          // dimensions: { width: 1080, height: 1920 } },
          // {
          //   source: {
          //     uri:
          //       "https://wkkrqsriursybsor-zippykid.netdna-ssl.com/wp-content/uploads/2017/05/coca-cola.jpg"
          //   }
          // },
          // {
          //   uri:
          //   "https://wkkrqsriursybsor-zippykid.netdna-ssl.com/wp-content/uploads/2017/05/coca-cola.jpg",
            // Optional: Adding a dimensions field with
            // the actual width and height for REMOTE IMAGES
            // will help improve performance.
          //   dimensions: { width: 1080, height: 1080 }
          // },
          // {
          //   URI:
          //     "https://i2-prod.mirror.co.uk/incoming/article12500030.ece/ALTERNATES/s615/682A6255-1.jpg",
            // Version *2.0.0 update (or greater versions):
            // Optional: Does not require an id for each
            // image object, but is for best practices and
            // can be better for performance with the API.
//             id: "blpccx4cn"
//           },
//           {
//             url:
//             "https://wkkrqsriursybsor-zippykid.netdna-ssl.com/wp-content/uploads/2017/05/coca-cola.jpg"
//           },
//           {
//             URL:
//             "https://wkkrqsriursybsor-zippykid.netdna-ssl.com/wp-content/uploads/2017/05/coca-cola.jpg"
//           }
//         ]}
//       />
//     );
//   }
// }
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph
// } from 'react-native-chart-kit'

// import {View ,Text, Dimensions} from 'react-native'
// export default class Chart extends React.Component {
//   render() {
//     return (

// <View>
//   <Text>
//     Bezier Line Chart
//   </Text>
//   <LineChart
//     data={{
//       labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//       datasets: [{
//         data: [
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100,
//           Math.random() * 100
//         ]
//       }]
//     }}
//     width={Dimensions.get('window').width} // from react-native
//     height={220}
//     chartConfig={{
//       backgroundColor: '#e26a00',
//       backgroundGradientFrom: '#fb8c00',
//       backgroundGradientTo: '#ffa726',
//       decimalPlaces: 2, // optional, defaults to 2dp
//       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       style: {
//         borderRadius: 16
//       }
//     }}
//     bezier
//     style={{
//       marginVertical: 8,
//       borderRadius: 16
//     }}
//   />
// </View>
//     );
//   }
// }
import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Image } from 'react-native-svg'
import Images from '../app/img/plastic.png'

class PieChartWithCenteredLabels extends React.PureComponent {

    render() {

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            },
            {
              key: 6,
              amount: 45,
              svg: { fill: '#ecb3ff' }
          },
          {
            key: 7,
            amount: 25,
            svg: { fill: '#ecb3ff' }
        }
        ,
            {
              key: 8,
              amount: 45,
              svg: { fill: '#ecb3ff' }
          },
          {
            key: 9,
            amount: 25,
            svg: { fill: '#ecb3ff' }
        }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G
                        key={index}
                        x={labelCentroid[ 0 ]}
                        y={labelCentroid[ 1 ]}
                    >
                        {/* <Circle
                            r={18}
                            fill={'white'}
                        /> */}
                        <Image
                            x={-10}
                            y={-10}
                            width={20}
                            height={20}
                            preserveAspectRatio="xMidYMid slice"
                            opacity="1"
                            href={Images}
                        />
                    </G>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels/>
            </PieChart>
        )
    }

}

export default PieChartWithCenteredLabels