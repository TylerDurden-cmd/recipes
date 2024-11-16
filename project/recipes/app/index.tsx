import Constants from "expo-constants";
import { StyleSheet, ScrollView, View, Image, Text, Pressable } from "react-native";
import { IRecipes } from "@/IRecipes";
import React, { useContext, useEffect, useState } from "react";
import { Link, Router, useRouter } from "expo-router";
import { recipesContext } from "@/recipesContext";

interface ICuisines {
  router: Router;
}

const Cousines = ({ router }: ICuisines) => {

  const { apiRecipes, SetApiRecipes } = useContext(recipesContext)

  const CuisineImage = (cuisine: string) => {
    switch (cuisine) {
      case 'Italian':
        return require('@/assets/images/Italian.png');
      case 'Asian':
        return require('@/assets/images/Asian.png');
      case 'American':
        return require('@/assets/images/American.png');
      case 'Mexican':
        return require('@/assets/images/Mexican.png');

      default:
        return require('@/assets/images/icon.png')
    }
  }

  const FilterData = apiRecipes.filter((item, index, self) =>
    index === self.findIndex((t) => t.cuisine === item.cuisine) && item.cuisine != ""
  );

  const GetApi = async () => {
    const uri: IRecipes[] = await fetch("https://sampleapis.assimilate.be/recipes/recipes").then((resp) => resp.json());
    SetApiRecipes(uri);
  }

  useEffect(() => {
    GetApi();
  }, [])

  return (
    <>
      <ScrollView>
        {FilterData.map((data) =>
          <Pressable onPress={() => { router.push(`/${data.cuisine}`) }}>
            <View key={data.id} style={styles.cuisine}>
              <Image source={CuisineImage(data.cuisine)} style={styles.imgCuisine} />
              <Text>
                {data.cuisine}
              </Text>

            </View>
          </Pressable>
        )}
      </ScrollView>
    </>
  )
}

const Index = () => {

  //useStates;
  const [apiRecipes, SetApiRecipes] = useState<IRecipes[]>([]);

  //Router object
  const router = useRouter();

  return (
    <recipesContext.Provider value={{ apiRecipes: apiRecipes, SetApiRecipes: SetApiRecipes }}>
      <View style={styles.container}>
        <Cousines router={router} />
      </View>
    </recipesContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  cuisine: {
    marginTop: 5,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    width: 370,
    minHeight: 250,
    borderRadius: 25,
    maxHeight: 300,
    marginBottom: 25
  },
  imgCuisine: {
    width: 370,
    height: 150,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginBottom: 20,
  }
})

export default Index;