import FetchApiData from "@/axiosClient";
import { useEffect, useState, createContext } from "react";

export const ConfigData = createContext();

const ContextAPI = ({ children }) => {
	const [imageURL, setImageURL] = useState(null);
	const [genres, setGenres] = useState(null);

	const SetConfigData = async () => {
		const imgRes = await FetchApiData("configuration");
		setImageURL(imgRes.data.images.secure_base_url+"original");

		const allGenres = {};
		const promises = [];
		const endPoints = ["movie", "tv"];

		endPoints.forEach((items) => {
			promises.push(FetchApiData(`genre/${items}/list`));
		});

		(await Promise.all(promises)).map((items, index) => {
			items.data.genres.map((genre, index2) => {
				allGenres[genre.id] = genre.name;
			});
		});

		setGenres({ ...allGenres });
	};

	useEffect(() => {
		SetConfigData();
	}, []);

	return (
		<ConfigData.Provider
			value={{
				genres,
				imageURL,
			}}
		>
			<div className="App">{children}</div>
		</ConfigData.Provider>
	);
};

export default ContextAPI;
