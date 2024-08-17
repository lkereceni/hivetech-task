import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { CityFind } from "../types";
import { fetchCityFind } from "../api";
import { getErrorMessage } from "../utilities";

export const useCityFindData = () => {
  const city = useSelector((state: RootState) => state.search.searchCity);

  const [cityFind, setCityFind] = useState<CityFind[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setCityFind(null);
    setError("");
    setLoading(true);

    const fetchCityFindData = async () => {
      try {
        const cityFindData = await fetchCityFind(city);

        const cityFind: CityFind[] = cityFindData.list.map(
          (entry): CityFind => ({
            id: entry.id,
            name: entry.name,
            coord: entry.coord,
            country: entry.sys.country,
          })
        );

        setCityFind(cityFind);
      } catch (error) {
        setError(getErrorMessage(error));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityFindData();
  }, [city]);

  return { cityFind, loading, error };
};
