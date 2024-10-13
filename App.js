import React, { useState } from 'react';
import { View, Text, Switch, Button, ScrollView, StyleSheet, TextInput, ImageBackground, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [projectType, setProjectType] = useState('website_static');
  const [designComplexity, setDesignComplexity] = useState('basic');
  const [pagesScreens, setPagesScreens] = useState('small');
  const [backend, setBackend] = useState('basic');
  const [database, setDatabase] = useState('local');
  const [team, setTeam] = useState('small_team');
  const [timeline, setTimeline] = useState('standard');
  const [features, setFeatures] = useState({
    registration: false,
    payment: false,
    api: false,
    admin: false,
    chat: false,
    push: false,
    location: false,
    ecommerce: false,
    firebase: false,
    twilio: false,
    aws: false,
    stripe: false
  });
  const [price, setPrice] = useState(0);

  // Price data
  const projectPrices = {
    website_static: 5000,
    website_dynamic: 10000,
    ecommerce: 20000,
    app_ios: 30000,
    app_android: 30000,
    app_hybrid: 35000
  };

  const designPrices = {
    basic: 5000,
    medium: 7500,
    advanced: 10000
  };

  const pagesPrices = {
    small: 2500,
    medium: 5000,
    large: 7500
  };

  const backendPrices = {
    basic: 2500,
    medium: 5000,
    advanced: 10000
  };

  const databasePrices = {
    local: 2500,
    cloud: 5000
  };

  const teamPrices = {
    small_team: 0.000,
    large_team: 5000
  };

  const timelinePrices = {
    standard: 1,
    urgent: 2
  };

  // Calculate total price
  const calculatePrice = () => {
    let totalPrice = projectPrices[projectType] +
      designPrices[designComplexity] +
      pagesPrices[pagesScreens] +
      backendPrices[backend] +
      databasePrices[database] +
      teamPrices[team];

    // Add feature costs
    Object.keys(features).forEach((key) => {
      if (features[key]) {
        totalPrice += parseInt(getFeatureCost(key));
      }
    });

    // Adjust for timeline
    totalPrice *= timelinePrices[timeline];
    setPrice(totalPrice.toFixed(2));
  };

  // Get feature cost
  const getFeatureCost = (feature) => {
    const featureCosts = {
      registration: 1000,
      payment: 2500,
      api: 5000,
      admin: 1500,
      chat: 5000,
      push: 1500,
      location: 1000,
      ecommerce: 5000,
      firebase: 3000,
      twilio: 3000,
      aws: 3000,
      stripe: 5000
    };
    return featureCosts[feature];
  };

  return (
    <ImageBackground
      source={require('./assets/starry_background.webp')} // Starry background image
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Logo and Title */}
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.webp')} // Local PNG logo
            style={styles.logo}
          />
          <Text style={styles.title}>Starset Consultancy</Text>
        </View>

        <Text style={styles.label}>Type of Project:</Text>
        <Picker selectedValue={projectType} onValueChange={(itemValue) => setProjectType(itemValue)} style={styles.picker}>
          <Picker.Item label="Website - Static" value="website_static" />
          <Picker.Item label="Website - Dynamic" value="website_dynamic" />
          <Picker.Item label="E-commerce Website" value="ecommerce" />
          <Picker.Item label="Mobile App - iOS" value="app_ios" />
          <Picker.Item label="Mobile App - Android" value="app_android" />
          <Picker.Item label="Mobile App - Hybrid" value="app_hybrid" />
        </Picker>

        <Text style={styles.label}>Design Complexity:</Text>
        <Picker selectedValue={designComplexity} onValueChange={(itemValue) => setDesignComplexity(itemValue)} style={styles.picker}>
          <Picker.Item label="Basic" value="basic" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>

        <Text style={styles.label}>Number of Pages/Screens:</Text>
        <Picker selectedValue={pagesScreens} onValueChange={(itemValue) => setPagesScreens(itemValue)} style={styles.picker}>
          <Picker.Item label="Small (1-5)" value="small" />
          <Picker.Item label="Medium (5-15)" value="medium" />
          <Picker.Item label="Large (15+)" value="large" />
        </Picker>

        <Text style={styles.label}>Backend Infrastructure:</Text>
        <Picker selectedValue={backend} onValueChange={(itemValue) => setBackend(itemValue)} style={styles.picker}>
          <Picker.Item label="Basic" value="basic" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>

        <Text style={styles.label}>Database:</Text>
        <Picker selectedValue={database} onValueChange={(itemValue) => setDatabase(itemValue)} style={styles.picker}>
          <Picker.Item label="Local (SQLite / MySQL)" value="local" />
          <Picker.Item label="Cloud (Firebase / AWS)" value="cloud" />
        </Picker>

        <Text style={styles.label}>Team Composition:</Text>
        <Picker selectedValue={team} onValueChange={(itemValue) => setTeam(itemValue)} style={styles.picker}>
          <Picker.Item label="Small Team (3-5 people)" value="small_team" />
          <Picker.Item label="Large Team (5+ people)" value="large_team" />
        </Picker>

        <Text style={styles.label}>Timeline:</Text>
        <Picker selectedValue={timeline} onValueChange={(itemValue) => setTimeline(itemValue)} style={styles.picker}>
          <Picker.Item label="Standard" value="standard" />
          <Picker.Item label="Urgent" value="urgent" />
        </Picker>

        <Text style={styles.label}>Features:</Text>
        {Object.keys(features).map((feature) => (
          <View style={styles.feature} key={feature}>
            <Text style={styles.featureText}>{feature.charAt(0).toUpperCase() + feature.slice(1)}</Text>
            <Switch
              value={features[feature]}
              onValueChange={(value) => setFeatures({ ...features, [feature]: value })}
            />
          </View>
        ))}

        <Text style={styles.result}>Estimated Price: ₹{price}</Text>
        <Button title="Calculate Price" onPress={calculatePrice} />

        {/* Footer with Copyright */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Starset Consultancy Services 2024</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: '#1abc9c',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black with 70% opacity
    borderRadius: 8,
    color: 'white',
    paddingHorizontal: 10,
  },  
  feature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 16,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1abc9c',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
