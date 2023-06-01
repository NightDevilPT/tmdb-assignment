import FetchApiData from "@/axiosClient";
import LoadingFrame from "@/components/LoadingFrame";
import { ConfigData } from "@/context/ContextAPI";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {AiFillStar} from "react-icons/ai";

const dummyData = {
	adult: false,
	backdrop_path: "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
	genre_ids: [28, 53, 80],
	id: 603692,
	original_language: "en",
	original_title: "John Wick: Chapter 4",
	overview:
		"With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
	popularity: 6448.501,
	poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
	release_date: "2023-03-22",
	title: "John Wick: Chapter 4",
	video: false,
	vote_average: 8,
	vote_count: 2322,
};

export default function Home() {
	const { imageURL } = useContext(ConfigData);
	const [activeTab, setActiveTab] = useState("home");
	const [page, setPage] = useState(1);
	const [pageCond, setPageCond] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const scrollRef = useRef();

	const GetData = async () => {
		const url =
			activeTab === "home"
				? `movie/top_rated?page=${page}`
				: activeTab === "popular"
				? `movie/popular?page=${page}`
				: null;

		const res = await FetchApiData(url);

		if(page>1){
			setData([...data,...res.data.results]);
		}else{
			setData([...res.data.results]);
		}

		setPageCond(false);
	};

	const UpdatePageNo = (e) => {
		const totalHeight = e.target.scrollHeight;

		if (e.target.scrollTop + e.target.clientHeight + 10 >= totalHeight && pageCond===false) {
			setPage((pre) => pre + 1);
			setPageCond(true);
		}
	};

	useEffect(() => {
		if (activeTab === "about") return;
		setPage(1);
		GetData();
		
		if(scrollRef.current){
			scrollRef.current.scrollTop=0;
		}
	}, [activeTab]);

	useEffect(() => {
		GetData();
	}, [page]);

	return (
		<div className="section" ref={scrollRef} onScroll={e=>UpdatePageNo(e)}>
			<div className="tabs-section">
				<button
					className={`tabs ${activeTab === "home" && "active-tabs"}`}
					onClick={(e) => {
						setActiveTab("home");
					}}
				>
					Home
				</button>
				<button
					className={`tabs ${
						activeTab === "popular" && "active-tabs"
					}`}
					onClick={(e) => {
						setActiveTab("popular");
					}}
				>
					Popular
				</button>
				<button
					className={`tabs ${activeTab === "about" && "active-tabs"}`}
					onClick={(e) => {
						setActiveTab("about");
					}}
				>
					About
				</button>
				<div
					className={`indicator`}
					style={{
						left:
							activeTab === "home"
								? "25px"
								: activeTab === "popular"
								? "145px"
								: "265px",
					}}
				></div>
			</div>

			<div className="data-section">
				<div className="card-section">
					{data?.map((items, index) => {
						return (
							<Link href={`/details/${items.id}`} key={items.id + "_" + index}>
								<CardFrame data={items} imageURL={imageURL} />
							</Link>
						);
					})}
				</div>
				{loading && (
					<LoadingFrame />
				)}
			</div>
		</div>
	);
}

export const CardFrame = ({ data, imageURL }) => {
	const vote = data?.vote_average.toFixed(1);
	return (
		<div className="card-div">
			<div className="img-div">
				<LazyLoadImage
					src={imageURL && imageURL + data.poster_path}
					effect="blur"
				/>
			</div>
			<div className="card-info">
				<h3 className="card-name">{data.title}</h3>
				<h5 className="card-date">{data.release_date}</h5>
				<div className="card-rating" style={{
					backgroundColor:vote<5?"red":vote<7?"orange":"green"
				}}>
					<AiFillStar className="rating-icon" />
					<span className="rating">{data?.vote_average.toFixed(1)}</span>
				</div>
			</div>
		</div>
	);
};
