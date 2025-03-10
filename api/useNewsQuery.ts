import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";
import { NewsItem } from "../types/news";

const NewsItemSchema = z.object({
  category: z.string(),
  datetime: z.number(),
  headline: z.string(),
  id: z.union([z.string(), z.number()]).transform(String),
  image: z.string().url(),
  related: z.string(),
  source: z.string(),
  summary: z.string(),
  url: z.string().url(),
});

const fetchNews = async (): Promise<NewsItem[]> => {
  const apiKey = await SecureStore.getItemAsync("API_KEY");
  if (!apiKey) throw new Error("❌ API key not found in SecureStore");

  const API_URL = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch news");

  const data = await response.json();

  const parsedData = z.array(NewsItemSchema).safeParse(data);
  if (!parsedData.success) {
    console.error("Invalid API response:", parsedData.error.format());
    throw new Error("Invalid API response format");
  }

  return parsedData.data;
};

export const useNews = () => {
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 5,
    refetchOnWindowFocus: true,
  });
};
