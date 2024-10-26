import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { IRecipes } from './IRecipes';

interface IData {
  GetData:React.Dispatch<React.SetStateAction<IRecipes[]>>
  data:IRecipes[]
}

const Home = ({data}:IData) => {

  const FilterData = data.filter((item, index, self) =>
    index === self.findIndex((t) => t.cuisine === item.cuisine) && item.cuisine != ""
  );

  /* shows all the data that doesnt have cuisine doubles */
  console.log(FilterData)


  return (
    <View>
      {FilterData.map((data) => 
      <Text key={data.id}>
        {data.cuisine}
      </Text>
      )}
    </View>
  )
}

const Root = () => {
  const [data,GetData] = React.useState<IRecipes[]>([])

  useEffect(() => {
    const ApiFetch = async() => {
      const uri:IRecipes[] = await fetch("https://sampleapis.assimilate.be/recipes/recipes").then((prom) => prom.json());
      GetData(uri);
    }
    ApiFetch()
  }, [])

  return (
    <View>
      <Home data={data} GetData={GetData}/>
    </View>
  )
}


export default function App() {

  return (
    <View style={styles.container}> 
    <Root/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
