import * as React from 'react';
import "./Circular.css";
var CircularProgress = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#5a5a5a" : _b, _c = _a.size, size = _c === void 0 ? "small" : _c, rounded = _a.rounded, value = _a.value;
    var customSizes = {
        tiny: 25,
        small: 30,
        medium: 35,
        large: 40,
    };
    var loaderStyle = {
        width: customSizes[size],
    };
    var pathStyle = {
        stroke: color,
        strokeCap: rounded ? "round" : "square",
    };
    return (<div style={loaderStyle} className="loader">
				<svg className={value ? "circularStatic" : "circular"} viewBox="22 22 44 44">
					<circle className={value ? "pathStatic" : "path"} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" strokeDasharray={value ? "126.92px" : "80px, 200px"} strokeDashoffset={value ? 126.92 - (value * 126.92) / 100 : 0} style={pathStyle}></circle>
				</svg>
			</div>);
};
export default CircularProgress;
//# sourceMappingURL=Circular.jsx.map