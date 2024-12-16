import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { topRatedMovies } from "@/api/Movies";
import { SafeAreaView } from "react-native-safe-area-context";

type Movie = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type MovieList = Movie[];

export default function HomeScreen() {
  const [movies, setMovies] = useState<MovieList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await topRatedMovies();
        setMovies(response);
      } catch (error) {
        console.error("Failed to fetch top-rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getPosterUrl = (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "";

  const formatReleaseDate = (date: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            {item.poster_path && (
              <Image
                source={{ uri: getPosterUrl(item.poster_path) }}
                style={styles.poster}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.releaseDate}>
                Release Date: {formatReleaseDate(item.release_date)}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#DDD",
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 8,
  },
  movieOverview: {
    fontSize: 14,
    color: "#DDD",
    flexShrink: 1, // Handles long overviews gracefully
  },
});
