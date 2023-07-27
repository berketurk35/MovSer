import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./ImageSwiperStyles";

import Swiper from "react-native-swiper";

function ImageSwiper() {
  const [platformVisible, setPlatformVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  function openPlatform() {
    setPlatformVisible(!platformVisible);
  }

  function handleImageClick(platform) {
    setSelectedPlatform(platform);
  }

  function getPlatformImage(platform) {
    switch (platform) {
      case "netflix":
        return require("../../images/netflix.png");
      case "prime":
        return require("../../images/prime.jpg");
      case "disney":
        return require("../../images/disney.jpg");
      case "blutv":
        return require("../../images/blutv.jpeg");
      case "mubi":
        return require("../../images/mubi.jpg");
      case "exxen":
        return require("../../images/exxen.png");
      case "appletv":
        return require("../../images/appletv.jpg");
      case "hbo":
        return require("../../images/hbo.jpg");
      default:
        return require("../../images/netflix.png");
    }
  }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={openPlatform}>
          <Text style={styles.text}> -&gt; Video Streaming Platforms</Text>
        </TouchableOpacity>
      </View>
      {platformVisible && (
        <View>
          <View style={styles.bodyRow}>
            <TouchableOpacity onPress={() => handleImageClick("netflix")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/netflix.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("prime")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/prime.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("disney")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/disney.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("blutv")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/blutv.jpeg")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyRow}>
            <TouchableOpacity onPress={() => handleImageClick("mubi")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/mubi.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("exxen")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/exxen.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("appletv")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/appletv.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("hbo")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/hbo.jpg")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.container}>
        <Swiper
          showsButtons={true}
          dotColor="white"
          showsPagination={true}
          
        >
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={getPlatformImage(selectedPlatform)}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/prime.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/disney.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/blutv.jpeg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/mubi.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/exxen.png")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/appletv.jpg")}
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../images/hbo.jpg")}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
}

export default ImageSwiper;
