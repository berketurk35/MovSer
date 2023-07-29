import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import styles from "./ImageSwiperStyles";

import Swiper from "react-native-swiper";

function ImageSwiper({ value, onChangeText, onPressButton}) {

  const [platformVisible, setPlatformVisible] = useState(false);
  const [picturesVisible, setPicturesVisible] = useState(false);
  const [swiperVisible, setSwiperVisible] = useState(false);
  const [swiperVisible2, setSwiperVisible2] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");


  function openPlatform() {
    setPlatformVisible(!platformVisible);
    setPicturesVisible(false);
  }

  function openPictures() {
    setPicturesVisible(!picturesVisible);
    setPlatformVisible(false);
  }

  function handleImageClick(platform) {
    setSelectedPlatform(platform);
    setSelectedImage(platform);
    setSwiperVisible(true);
    setSwiperVisible2(false);
  }

  function handleImageClick2(platform) {
    setSelectedPlatform(platform);
    setSelectedImage(platform);
    setSwiperVisible2(true);
    setSwiperVisible(false);

  }

  function getPlatformImage(platform) {
    switch (platform) {
      case "netflix":
        return require("../../images/netflix.png");
      case "prime":
        return require("../../images/prime.png");
      case "disney":
        return require("../../images/disney.png");
      case "blutv":
        return require("../../images/blutv.png");
      case "mubi":
        return require("../../images/mubi.png");
      case "exxen":
        return require("../../images/exxen.png");
      case "appletv":
        return require("../../images/appletv.png");
      case "hbo":
        return require("../../images/hbo.png");
      default:
        return;
    }
  }

  function getCategoryImage(platform) {
    switch (platform) {
      case "1":
        return require("../../images/1.png");
      case "2":
        return require("../../images/2.png");
      case "3":
        return require("../../images/3.png");
      case "4":
        return require("../../images/4.png");
      case "5":
        return require("../../images/5.png");
      case "6":
        return require("../../images/6.png");
      case "7":
        return require("../../images/7.png");
      case "8":
        return require("../../images/8.png");
      case "9":
        return require("../../images/9.png");
      case "10":
        return require("../../images/10.png");
      case "11":
        return require("../../images/11.png");
      case "12":
        return require("../../images/12.png");
      default:
        return;
    }
  }
  return (
    <View>
      <View>
        <Text style={styles.cardName} > Card Name </Text>
        <Text> {selectedImage} </Text>
        <View style={styles.searchMovie} >
          <TextInput
            value={value}
            autoCapitalize="sentences"
            onChangeText={onChangeText}
            placeholder="Kart ismini yazınız.."
            style={styles.searchText}
          />
        </View>
        <View style={styles.seperator} />
        <Text style={styles.imageBack} > Card Background Images </Text>
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
                source={require("../../images/prime.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("disney")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/disney.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("blutv")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/blutv.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyRow}>
            <TouchableOpacity onPress={() => handleImageClick("mubi")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/mubi.png")}
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
                source={require("../../images/appletv.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick("hbo")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/hbo.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={openPictures}>
        <Text style={styles.text}> -&gt; Pictures from Different Categories</Text>
      </TouchableOpacity>
      {picturesVisible && (
        <View>
          <View style={styles.bodyRow}>
            <TouchableOpacity onPress={() => handleImageClick2("1")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/1.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("2")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/2.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("3")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/3.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("4")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/4.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyRow}>
            <TouchableOpacity onPress={() => handleImageClick2("5")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/5.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("6")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/6.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("7")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/7.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("8")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/8.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyRow}>
            <TouchableOpacity onPress={() => handleImageClick2("9")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/9.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("10")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/10.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("11")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/11.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageClick2("12")}>
              <Image
                style={styles.miniImg}
                resizeMode="contain"
                source={require("../../images/12.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.seperator2} />
      {swiperVisible && (
        <View style={styles.container}>
          <Text style={styles.preview} >Preview</Text>
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
                source={require("../../images/netflix.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/prime.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/disney.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/blutv.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/mubi.png")}
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
                source={require("../../images/appletv.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/hbo.png")}
              />
            </View>
          </Swiper>
        </View>
      )}

      {swiperVisible2 && (
        <View style={styles.container}>
          <Text style={styles.preview} >Preview</Text>
          <Swiper
            showsButtons={true}
            dotColor="white"
            showsPagination={true}

          >
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={getCategoryImage(selectedPlatform)}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/1.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/2.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/3.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/4.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/5.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/6.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/7.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/8.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/9.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/10.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/11.png")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../images/12.png")}
              />
            </View>
          </Swiper>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={onPressButton} >
        <Text style={styles.buttonText} >Kartı Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ImageSwiper;
