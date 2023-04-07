import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { TextInput } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#8E8E93',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});


function ActivityScreen({route, setActivities, activities, navigation}) {

  const [distance, setDistance] = useState(route ? route.params.distance : 0);
  const [temperature, setTemperature] = useState( route ? route.params.temperature : 0);
  const [pluie, setPluie] = useState(route ? route.params.pluie : false);
  const [denivele, setDenivele] = useState( route ? route.params.denivele : 0);
  const [repas, setRepas] = useState( route ? route.params.repas : "");
  const [ressenti, setRessenti] = useState( route ? route.params.ressenti : 0);

  const handlePress = () => {
    
    setDistance(0);
    setTemperature(0);
    setPluie(false);
    setDenivele(0);
    setRepas("");
    setRessenti(0);
    console.log(distance);

    setActivities([...activities, {
      distance: distance,
      temperature: temperature,
      pluie: pluie,
      denivele: denivele,
      repas: repas,
      ressenti: ressenti }
    ]);
    

  }

  return (
    <View style={styles.container} >
      <Text style={styles.text}>Distance :</Text>
      <TextInput style={styles.input} type="number" name="distance" id="distance" value={distance} onChange={e => setDistance(e.target.value)} />
      <Text style={styles.text}>Temperature :</Text>
      <TextInput style={styles.input} type="number" name="temperature" id="temperature" value={temperature} onChange={e => setTemperature(e.target.value)} />
      <Text style={styles.text}>Pluie :</Text>
      <TextInput style={styles.input} type="checkbox" name="pluie" id="pluie" value={pluie} onChange={e => setPluie(e.target.value)} />
      <Text style={styles.text}>Denivele :</Text>
      <TextInput style={styles.input} type="number" name="denivele" id="denivele" value={denivele} onChange={e => setDenivele(e.target.value)} />
      <Text style={styles.text}>Repas :</Text>
      <TextInput style={styles.input} type="text" name="repas" id="repas" value={repas} onChange={e => setRepas(e.target.value)} />
      <Text style={styles.text}>Ressenti :</Text>
      <TextInput style={styles.input} type="number" name="ressenti" id="ressenti" value={ressenti} onChange={e => setRessenti(e.target.value)} />

      <Button title="Add the activity" onPress={handlePress} />
    </View>
  )
}

function RapportScreen({route, activities, navigation}){
  

  const moyenneDistance = () => {
    let sum = 0;
    for (let i = 0; i < activities.length; i++) {
      sum += parseInt(activities[i].distance);
    }
    return sum / activities.length;
  }

  const moyenneTemperature = () => {
    let sum = 0;
    for (let i = 0; i < activities.length; i++) {
      console.log(sum);
      sum += parseInt(activities[i].temperature);
    }
    console.log(sum);
    return sum / activities.length;
  }

  const moyennePluie = () => {
    let sum = 0;
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].pluie) {
        sum += 1;
      }
    }
    return sum / activities.length;
  }

  const moyenneDenivele = () => {
    let sum = 0;
    for (let i = 0; i < activities.length; i++) {
      sum += parseInt(activities[i].denivele);
    }
    return sum / activities.length;
  }

  const moyenneRessenti = () => {
    let sum = 0;
    for (let i = 0; i < activities.length; i++) {
      sum += parseInt(activities[i].ressenti);
    }
    return sum / activities.length;
  }

  const distanceMoy = moyenneDistance();
  const temperatureMoy = moyenneTemperature();
  const pluieMoy = moyennePluie();
  const deniveleMoy = moyenneDenivele();
  const ressentiMoy = moyenneRessenti();

  console.log(activities);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Distance moyenne : {distanceMoy}</Text>
      <Text style={styles.text}>Temperature moyenne : {temperatureMoy}</Text>
      <Text style={styles.text}>Pluie moyenne : {pluieMoy}</Text>
      <Text style={styles.text}>Denivele moyenne : {deniveleMoy}</Text>
      <Text style={styles.text}>Ressenti moyen : {ressentiMoy}</Text>
    </View>
  )
}

function ProfilScreen({ route, profil, setProfil, navigation }) {
  const [taille, setTaille] = useState(route ? route.params.taille : 0);
  const [poids, setPoids] = useState(route ? route.params.poids : 0);
  const [genre, setGenre] = useState(route ? route.params.genre : "");


  const ajouterProfil = () => {
    setTaille(0);
    setPoids(0);
    setGenre("");
    setProfil([...profil, {
      taille: taille,
      poids: poids,
      genre: genre,
      date : new Date()
    }]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Taille :</Text>
      <TextInput style={styles.input} type="number" name="taille" id="taille" value={taille} onChange={e => setTaille(e.target.value)} />
      <Text style={styles.text}>Poids :</Text>
      <TextInput style={styles.input} type="number" name="poids" id="poids" value={poids} onChange={e => setPoids(e.target.value)} />
      <Text style={styles.text}>Genre :</Text>
      <TextInput style={styles.input} type="text" name="genre" id="genre" value={genre} onChange={e => setGenre(e.target.value)} />
      <Button
        title="Add information for your profil"
        onPress={ajouterProfil}
      />
    </View>
  )
}

const Tab = createBottomTabNavigator();




export default function App() {

  const [activities, setActivities] = useState([]);

  const [profil, setProfil] = useState([]);


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Activity"
          options={{ title: 'Activite' }}>
            {() => <ActivityScreen  setActivities={setActivities} activities={activities} />}
        </Tab.Screen>
        <Tab.Screen
          name="Rapport"
          option={{ title: 'Activities'}}>
            {() => <RapportScreen activities={activities} />}
        </Tab.Screen>
        
        <Tab.Screen
          name="Profil"
          options={{ title: 'Profil' }}>
            {() => <ProfilScreen setProfil={setProfil} profil={profil} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}



