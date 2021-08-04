import React from "react";
import "./Circular.css";

interface Props {
	color?: string;
	size?: string;
	rounded?: boolean;
	value?: number;
}
const CircularProgress: React.FC<Props> = ({
	color = "#5a5a5a",
	size = "small",
	rounded,
	value,
}) => {
	interface Sizes {
		[key: string]: number;
	}

	const customSizes: Sizes = {
		tiny:25,
		small: 30,
		medium: 35,
		large: 40,
	};

	const loaderStyle = {
		width: customSizes[size],
	};

	const pathStyle = {
		stroke: color,
		strokeCap: rounded ? "round" : "square",
	};


	return (
			<div style={loaderStyle} className="loader">
				<svg
					className={value ? "circularStatic" : "circular"}
					viewBox="22 22 44 44"
				>
					<circle
						className={value ? "pathStatic" : "path"}
						cx="44"
						cy="44"
						r="20.2"
						fill="none"
						strokeWidth="3.6"
						strokeDasharray={value?"126.92px":"80px, 200px"}
						strokeDashoffset={value?126.92 - (value * 126.92) / 100:0}
						style={pathStyle}
					></circle>
				</svg>
			</div>
	);
};


export default CircularProgress;