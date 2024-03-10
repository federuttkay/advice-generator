import "./Card.css";
import decorativeImgDesktop from "../assets/images/pattern-divider-desktop.svg";
import decorativeImgMobile from "../assets/images/pattern-divider-mobile.svg";
import btnImg from "../assets/images/icon-dice.svg";
import { useEffect, useState } from "react";

const Card = () => {
	const [refreshNumber, setRefreshNumber] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState({ id: -1, message: "" });

	interface Response {
		slip: {
			id: number;
			advice: string;
		};
	}

	useEffect(() => {
		const getMessage = async () => {
			try {
				setIsLoading(true);
				setMessage({ id: -1, message: "" });
				setError(false);
				const response = await fetch("https://api.adviceslip.com/advice");
				const obj = (await response.json()) as Response;
				setMessage({
					id: obj.slip.id,
					message: obj.slip.advice,
				});
			} catch (error) {
				console.error(error);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};

		getMessage();
	}, [refreshNumber]);

	return (
		<section className="card">
			<div className="card__content grid" key={refreshNumber}>
				<h2 className="card__title">
					advice #{message.id !== -1 && message.id}
				</h2>
				{isLoading && <p className="card__loading">Loading...</p>}
				{error && (
					<p className="card__error">There was an error. Please try again.</p>
				)}
				<p className="card__advice">{message.message}</p>
				<picture className="divider">
					<source srcSet={decorativeImgDesktop} media="(min-width: 550px)" />
					<img src={decorativeImgMobile} alt="" />
				</picture>
			</div>
			<button
				className="card__btn"
				onClick={() => {
					setRefreshNumber((prev) => prev + 1);
				}}
			>
				<img className="btnImage" src={btnImg} alt="" />
			</button>
		</section>
	);
};
export default Card;
