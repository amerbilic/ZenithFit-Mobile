import React, { useState } from "react";
import { Platform, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const StarRating = ({rating,input}) => {
  const [defaultRating, setDefaultRating] = useState(rating);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const userId = useSelector((state) => state.auth.userId);

  const starClickHandler = (rating, articleId, update) => {
    if (update === 0) {
      dispatch(
        addRating({
          rating: rating,
          user_id: loggedInUser.id,
          article_id: articleId,
        })
      );
    } else {
      dispatch(
        updateRating({
          rating: rating,
          id:update.id
        })
      );
     
    }
  };

  const starImageFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
  const starImageEmpty =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";
  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => {input ? {setDefaultRating(item) }: ""}}
          >
            <Image
              style={styles.starImgStyle}
              source={
                item <= defaultRating
                  ? { uri: starImageFilled }
                  : { uri: starImageEmpty }
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
});

export default StarRating;
