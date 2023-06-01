import FetchApiData from "@/axiosClient";
import LoadingFrame from "@/components/LoadingFrame";
import { ConfigData } from "@/context/ContextAPI";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { HiBackspace } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar } from "react-icons/ai";

const index = () => {
	const router = useRouter();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const { imageURL, genres } = useContext(ConfigData);

	const GetData = async () => {
		const id = router.query.id;
		setLoading(true);
		const res = await FetchApiData(`movie/${id}`);
		setData(res.data);
		setLoading(false);
		console.log(res.data);
	};

	useEffect(() => {
		if (!router.isReady) return;
		GetData();
	}, [router.isReady]);

	return (
		<div className="details-section">
			<div className="back-header">
				<Link href="/">
					<HiBackspace className="back-icon" />
				</Link>
			</div>

			{loading ? (
				<LoadingFrame />
			) : (
				<div className="details-info-section">
					<div className="poster-section">
						<LazyLoadImage
							effect="blur"
							src={imageURL && imageURL + data?.poster_path}
						/>
					</div>
					<div className="details-info-wrapper">
						<h1 className="poster-title">{data.title}</h1>
						<span className="poster-tag-line">{data?.tagline}</span>
						<div className="poster-genres-section">
							{genres &&
								data?.genres.map((items, index) => {
									return (
										<span
											key={
												data.id +
												"_" +
												items.id +
												"_" +
												index
											}
											className="genres"
										>
											{items.name}
										</span>
									);
								})}
							<div
								className="rating-section"
								style={{
									backgroundColor:
										data?.vote_average.toFixed(1) < 5
											? "red"
											: data?.vote_average.toFixed(1) < 7
											? "orange"
											: "green",
								}}
							>
								<AiFillStar className="rating-icon" />
								<span className="rating">
									{data?.vote_average.toFixed(1)}
								</span>
							</div>
						</div>
						<div className="poster-overview-section">
							<h3 className="overview-header">Overview</h3>
							<span className="overview">{data?.overview}</span>
						</div>
						<h3 className="poster-info">
							Status :<span>{data?.status}</span>
						</h3>
						<h3 className="poster-info">
							Release Date :
							<span>
								{dayjs(data?.release_date).format(
									"MMM,DD YYYY"
								)}
							</span>
						</h3>
						<h3 className="poster-info">
							Runtime :<span>{data?.runtime} minutes</span>
						</h3>
						<h3 className="poster-info">
							Popularity :
							<span>{data?.popularity.toFixed(1)}</span>
						</h3>
						<h3 className="poster-info">
							Budget :<span>{data?.budget}$</span>
						</h3>
						<h3 className="poster-info">
							Revenue :<span>{data?.revenue}$</span>
						</h3>
					</div>
				</div>
			)}
		</div>
	);
};

export default index;
