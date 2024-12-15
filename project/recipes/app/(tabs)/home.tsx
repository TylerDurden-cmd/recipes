import { StyleSheet, ScrollView, View, Image, Text, Pressable } from "react-native";
import { IRecipes } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { recipesContext } from "@/recipesContext";
import { IRouter } from "@/types";

const Cousines = ({ router }: IRouter) => {

  const { apiRecipes, setApiRecipes } = useContext(recipesContext)

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

  const filterData = apiRecipes.filter((item, index, self) =>
    index === self.findIndex((t) => t.cuisine === item.cuisine) && item.cuisine != ""
  );

  const GetApi = async () => {
    const headers = { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDUyOUBhcC5iZSIsImlhdCI6MTczMzczMjcxNH0.JIIkE58PSnOzzteSdxssqmQdE_ZA-5PyUecPB8Cygog` };
    const uri: IRecipes[] = await fetch("https://sampleapis.assimilate.be/recipes/recipes", { headers }).then((resp) => resp.json());
    setApiRecipes(uri);
  }

  useEffect(() => {
    GetApi();
  }, [])

  return (
    <>
      <ScrollView>
        {filterData.map((data) =>
          <Pressable onPress={() => { router.push({ pathname: "/cuisines/[cuisine]", params: { cuisine: data.cuisine } }) }}>
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
    <View style={styles.container}>
      <Cousines router={router} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
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
    minHeight: 220,
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