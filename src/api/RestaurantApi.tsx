import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useSearchRestaurants = (city?: string) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    //the query isnt going to work unless we have a value for city
    //if city is undefined, the query wont  run
    { enabled: !!city }
  );

  return { results, isLoading };
};
