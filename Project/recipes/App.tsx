import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { IRecipes } from './IRecipes';
import Constants from 'expo-constants';

interface IData {
  GetData: React.Dispatch<React.SetStateAction<IRecipes[]>>
  data: IRecipes[]
}

const Home = ({ data }: IData) => {

  const FilterData = data.filter((item, index, self) =>
    index === self.findIndex((t) => t.cuisine === item.cuisine) && item.cuisine != ""
  );

  /* shows all the data that doesnt have cuisine doubles */
  console.log(FilterData)

  const CuisineImage = (cuisine: string) => {
    switch (cuisine) {
      case 'Italian':
        return require('./assets/Italian.png');
      case 'Asian':
        return require('./assets/Asian.png');
      case 'American':
        return require('./assets/American.png');
      case 'Mexican':
        return require('./assets/Mexican.png');

      default:
        return require('./assets/icon.png')
    }
  }


  return (
    <View>
      <ScrollView>
        {FilterData.map((data) =>
          <View key={data.id} style={styles.cuisine}>
            <Image source={CuisineImage(data.cuisine)} style={styles.imgCuisine} />

            <Text>
              {data.cuisine}
            </Text>

          </View>
        )}
      </ScrollView>
    </View>
  )
}

const Root = () => {
  const [data, GetData] = React.useState<IRecipes[]>([])

  useEffect(() => {
    const ApiFetch = async () => {
      const uri: IRecipes[] = await fetch("https://sampleapis.assimilate.be/recipes/recipes").then((prom) => prom.json());
      GetData(uri);
    }
    ApiFetch()
  }, [])

  return (
    <View>
      <Home data={data} GetData={GetData} />
    </View>
  )
}


export default function App() {

  return (
    <View style={styles.container}>
      <Root />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  cuisine: {
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
});
