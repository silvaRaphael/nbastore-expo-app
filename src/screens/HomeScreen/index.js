import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../../constants';
import { products } from '../../../api';

import ProductCard from '../../components/productCard';
import CategoryButton from '../../components/categoryButton';
import HeaderBar from '../../components/header';
import TabBar from '../../components/tab';

const HomeScreen = ({ navigation }) => {

  const [category, setCategory] = React.useState('All');
  const [PRODUCTS, setProducts] = React.useState(products);

  function changeCategory(name) {
    
    const filter = products.filter(item => {
      return item[0].category == name && item
    })
    
    setCategory(name)
    name == 'All' ? setProducts(products) : setProducts(filter)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bgDark,
        paddingTop: 30
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          width: SIZES.width,
          paddingBottom: 80
        }}
      >
        <HeaderBar navigation={navigation} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: SIZES.width,
            height: 80,
            marginBottom: SIZES.margin
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: SIZES.padding,
            }}
          >
            <CategoryButton
              name="All"
              active={category}
              onPress={() => changeCategory('All')}
            />
            <CategoryButton
              name="T-Shirts"
              icon={icons.shirt_icon}
              active={category}
              onPress={() => changeCategory('T-Shirts')}
            />
            <CategoryButton
              name="Jerseys"
              icon={icons.jersey_icon}
              active={category}
              onPress={() => changeCategory('Jerseys')}
            />
            <CategoryButton
              name="Caps"
              icon={icons.cap_icon}
              active={category}
              onPress={() => changeCategory('Caps')}
            />
          </ScrollView>
        </View>
        {
          PRODUCTS.map((category, index) => {
            return (
              <View key={index + ''} >
                <View
                  style={{
                    marginLeft: SIZES.margin
                  }}
                >
                  {index == 0 && (
                    <Text
                      style={{
                        ...FONTS.h5,
                        color: COLORS.secondary
                      }}
                    >
                      Recently Popular
                    </Text>
                  )}
                  <Text
                    style={{
                      ...FONTS.bigTitle,
                      color: COLORS.white
                    }}
                  >
                    {category[0].category}
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingLeft: SIZES.margin,
                  }}
                >
                {
                  category[1].map((item, index) => {
                    return (
                      <ProductCard
                        id={item.id}
                        key={item.id.toString()}
                        name={item.name}
                        image={item.image}
                        backgroundColor={item.backgroundColor}
                        price={item.price}
                        sizes={item.sizes}
                        colors={item.colors}
                        onPress={() => {
                          navigation.push('Product', {
                            data: JSON.stringify({
                              id: item.id,
                              code: item.code,
                              image: item.image,
                              name: item.name,
                              backgroundColor: item.backgroundColor,
                              price: item.price,
                              sizes: item.sizes,
                              colors: item.colors
                            })
                          })
                        }}
                      />
                    )
                  })
                }
                </ScrollView>
              </View>
            )
          })
        }
      </ScrollView>
      <TabBar actual="Home" navigation={navigation} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
export default HomeScreen;

