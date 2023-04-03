import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <Text>Vous venez de finir une course ? </Text>
      <Button
        title="Enter a new activity"
        onPress={() =>
          navigation.push('Activity', {
            distance: 10,
            temperature: 10,
            pluie: false,
            denivele: 100,
            repas: "pattes",
            ressenti: 5 }
            )
        }
      />
    </View>
  );
}


function ActivityScreen({route, navigation}) {
  const [distance, setDistance] = useState(route ? route.params.distance : 0);
  const [temperature, setTemperature] = useState( route ? route.params.temperature : 0);
  const [pluie, setPluie] = useState(route ? route.params.pluie : false);
  const [denivele, setDenivele] = useState( route ? route.params.denivele : 0);
  const [repas, setRepas] = useState( route ? route.params.repas : "");
  const [ressenti, setRessenti] = useState( route ? route.params.ressenti : 0);

  return (
    <View>
      <Text>Distance :</Text>
      <input type="number" name="distance" id="distance" onChange={e => setDistance(e.target.value)} />
      <Text>Temperature :</Text>
      <input type="number" name="temperature" id="temperature" onChange={e => setTemperature(e.target.value)} />
      <Text>Pluie :</Text>
      <input type="checkbox" name="pluie" id="pluie" onChange={e => setPluie(e.target.value)} />
      <Text>Denivele :</Text>
      <input type="number" name="denivele" id="denivele" onChange={e => setDenivele(e.target.value)} />
      <Text>Repas :</Text>
      <input type="text" name="repas" id="repas" onChange={e => setRepas(e.target.value)} />
      <Text>Ressenti :</Text>
      <input type="range" name="ressenti" id="ressenti" min="1" max="10" onChange={e => setRessenti(e.target.value)} />
      
      <Button
        title="Go to rapport"
        onPress={() =>
          navigation.push('Rapport', {
            distance: distance,
            temperature: temperature,
            pluie: pluie,
            denivele: denivele,
            repas: repas,
            ressenti: ressenti }
            )
        }
      />
      <Button
        title="Add the activity"
        onPress={() =>
          setActivities([...activities, {
            distance: distance,
            temperature: temperature,
            pluie: pluie,
            denivele: denivele,
            repas: repas,
            ressenti: ressenti }
          ])

        }
      />
    </View>
  )
}

function RapportScreen({route, navigation}){
  

  return (
    <View>
      <Text>Distance moyenne : {JSON.stringify(distanceMoy)}</Text>
      <Text>Temperature moyenne : {JSON.stringify(temperatureMoy)}</Text>
      <Text>Pluie moyenne : {JSON.stringify(pluieMoy)}</Text>
      <Text>Denivele moyenne : {JSON.stringify(deniveleMoy)}</Text>
      <Text>Repas moyen : {JSON.stringify(repasMoy)}</Text>
      <Text>Ressenti moyen : {JSON.stringify(ressentiMoy)}</Text>
      <Button
        title='Refresh the report'
        onPress={() =>
          navigation.push('Rapport', {
            distanceMoy: moyenneDistance(distance),
            temperatureMoy: temperatureMoy,
            pluieMoy: pluieMoy,
            deniveleMoy: deniveleMoy,
            repasMoy: repasMoy,
            ressentiMoy: ressentiMoy }
          )
        }
      />
    </View>
  )
}

function ProfilScreen({ route, navigation }) {
  const { pseudo, taille, poids, genre } = route.params;
  return (
    <View>
      <Text>Pseudo : {JSON.stringify(pseudo)}</Text>
      <Text>Taille : {JSON.stringify(taille)}</Text>
      <Text>Poids : {JSON.stringify(poids)}</Text>
      <Text>Genre : {JSON.stringify(genre)}</Text>
      <Button
        title="View the profile"
        onPress={() =>
          navigation.push('Profil')
        }
      />
    </View>
  )
}

const Tab = createBottomTabNavigator();




export default function App() {
  const [activities, setActivities] = useState([]);
  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen 
          name="Activity"
          component={ActivityScreen}
          initialParams={{ distance: 10, temperature: 10, pluie: false, denivele: 100, repas: "pattes", ressenti: 5 }}
        />
        <Tab.Screen
          name="Rapport"
          component={RapportScreen}
          initialParams={{ distanceMoy: 10, temperatureMoy: 10, pluieMoy: false, deniveleMoy: 100, repasMoy: "pattes", ressentiMoy: 5, distance : [10, 20, 30] }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfilScreen}
          initialParams={{ pseudo: "user", taille: 1.80, poids: 80, genre: "Homme" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
