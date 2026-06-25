import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {Link, useLocalSearchParams} from "expo-router";

interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  image: string;
  imageBack: string;
  types:PokDetails[];
}
interface PokDetails {
  type: {
    name: keyof typeof colorsByType;
    url: string;
  };
}

const colorsByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

const textColorsByType = {
  normal: "#456dc3",
  fire: "#f9f9f9",
  water: "#f9f9f9",
  electric: "#456dc3",
  grass: "#f9f9f9",
  ice: "#f9f9f9",
  fighting: "#f9f9f9",
  poison: "#f9f9f9",
  ground: "#f9f9f9",
  flying: "#f9f9f9",
  psychic: "#f9f9f9",
  bug: "#456dc3",
  rock: "#f9f9f9",
  ghost: "#f9f9f9",
  dragon: "#f9f9f9",
  dark: "#f9f9f9",
  steel: "#f9f9f9",
  fairy: "#f9f9f9",
};

const textShadowsByType = {
  normal: "transparent",
  fire: "#777a78",
  water: "#777a78",
  electric: "transparent",
  grass: "#777a78",
  ice: "#777a78",
  fighting: "#777a78",
  poison: "#777a78",
  ground: "#777a78",
  flying: "#777a78",
  psychic: "#777a78",
  bug: "transparent",
  rock: "#777a78",
  ghost: "#777a78",
  dragon: "#777a78",
  dark: "#777a78",
  steel: "#777a78",
  fairy: "#777a78",
};

export default function Index() {
  const params = useLocalSearchParams();
  const [pokData, setPokData] = useState<Pokemon[]>([]);
  const typeName = pokData?.types?.[0]?.type?.name as keyof typeof colorsByType | undefined;
  const lightDarkTextColor = typeName ? textColorsByType[typeName] : "#f9f9f9";
  const textShadowColor = typeName ? textShadowsByType[typeName] : "#777a78";
  
    useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=25");
      const data = await response.json();
      const detailedData = await Promise.all(
        data.results.map(async (pokemon: { name: string; image: string }) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
      );
      setPokData(detailedData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      {pokData?.map((pokemon) => (
        <Link 
        key={pokemon.name} 
        href={{ pathname: "/details", params: { name: pokemon.name } }}
        style={styles.cardLink}
        >

        <View style={[styles.card, { backgroundColor: colorsByType[pokemon.types[0].type.name]+80, borderRadius: 20 }]} >
          <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
          <Text style={[styles.type, { color: lightDarkTextColor, textShadowColor }]}>{pokemon.types[0].type.name}</Text>
          <View style={{ flexDirection: "row-reverse", justifyContent: "center" }}>
            <Image source={{ uri: pokemon.image }} style={{ width: 160, height: 160 }} />
            <Image source={{ uri: pokemon.imageBack }} style={{ width: 160, height: 160 }} />
          </View>
        </View>
        </Link>
      ))}
    </ScrollView> 
  ); 
}

const styles = StyleSheet.create({
  cardLink: {
    width: "100%",
  },
  card: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden"
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: "center",
  },

})