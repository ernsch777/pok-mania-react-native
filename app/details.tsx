import { Text, Image, View, ScrollView, StyleSheet, Linking} from "react-native";
import { useEffect,useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

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
  electric: "#f9f9f9",
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

export default function Details() {
    const params = useLocalSearchParams();
    const [pokData, setPokData] = useState<any>(null);
    const displayName = pokData?.name.charAt(0).toUpperCase() + pokData?.name.slice(1);
    const typeName = pokData?.types?.[0]?.type?.name as keyof typeof colorsByType | undefined;
    const detailColor = typeName ? colorsByType[typeName] + "80" : "#f9f9f9";
    const lightDarkTextColor = typeName ? textColorsByType[typeName] : "#f9f9f9";
    const textShadowColor = typeName ? textShadowsByType[typeName] : "#777a78";
    const borderColor = typeName ? textColorsByType[typeName]+ "99" : "#f9f9f9";

    useEffect(() => {fetchData();}, [params.name]);
    async function fetchData() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
            const data = await response.json();
            setPokData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
  return (
    <>
        <Stack.Screen 
            options={{ 
                headerTitle: () => (
                    <View style={{margin:10,}}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>{`${displayName}'s Details`}</Text>
                    </View>
                ),
            }}
        />
        <ScrollView
            contentContainerStyle={{ 
                padding: 16, 
                gap: 16,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                }}>  
                <View style={[styles.detail,{backgroundColor: detailColor}]}>
                    <Image source={{ uri: pokData?.sprites?.front_default }} style={{ width: 200, height: 200, marginBottom: -20 }} />
                    <View style={styles.detailHeader}>
                        <View style={styles.detailRow}>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailText, { color: lightDarkTextColor, textShadowColor }]}>Height:  {pokData?.height}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailText, { color: lightDarkTextColor, textShadowColor}]}>Weight:  {pokData?.weight}</Text>  
                            </View>
                        </View>
                        <View style={styles.detailRow} >
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailText, { color: lightDarkTextColor, textShadowColor}]}>Ability: {"\n"}{pokData?.abilities?.[0]?.ability?.name ? pokData?.abilities?.[0]?.ability?.name.charAt(0).toUpperCase() + pokData?.abilities?.[0]?.ability?.name.slice(1) : "None"}</Text>  
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailText, { color: lightDarkTextColor, textShadowColor}]}>Held Item: {"\n"}{pokData?.held_items?.[0]?.item?.name ? pokData?.held_items?.[0]?.item?.name.charAt(0).toUpperCase() + pokData?.held_items?.[0]?.item?.name.slice(1) : "None"}</Text>  
                            </View> 
                        </View>
                    </View>
                    <Text style={[styles.wikiLink, { color: lightDarkTextColor, textShadowColor, borderColor }]} onPress={() => Linking.openURL(`https://pokemon.fandom.com/wiki/${pokData?.name}`)}>
                        View On Pokemon Wiki
                    </Text>
                    <Text style={[styles.movesHeader, { color: lightDarkTextColor, textShadowColor, borderColor }]}>Possible Moves</Text>
                    <View style={{ width: "95%", alignItems: "center" }}>
                        {pokData?.moves?.map((moves: any, index: number) => (
                            <Text style={[styles.detailText, styles.moveText, { color: lightDarkTextColor, textShadowColor}]} key={index}>
                                Move {index + 1}: {moves.move.name ? moves.move.name.charAt(0).toUpperCase() + moves.move.name.slice(1) : "None"}
                            </Text>
                        ))}
                    </View>
                </View>              
        </ScrollView>
    </>
  ); 
}

const styles = StyleSheet.create({
    detail: {
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 30,
        borderRadius: 20,
        width: "100%",
        gap: 20,
    },
    detailText: {
        fontSize: 20,
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        paddingLeft: 20,
    },
    detailHeader: {
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 0,
        gap: 10,
    },
    detailRow: {
        flexDirection: "row",
        width: "100%",
    },
    detailItem: {
        flex: 1,
    },
    wikiLink: {
        fontSize: 25,
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        width: "100%",
        textAlign: "center",
        paddingVertical: 20,
    },
    movesHeader: {
        fontSize: 26,
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        borderBottomWidth: 0,
        width: "100%",
        textAlign: "center",
    },
    moveText: {
        textAlign: "left",
        width: "100%",
    }
});