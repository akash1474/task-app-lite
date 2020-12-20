import * as React from "react";
import "./DropDown.css";
export var DropDown = function (_a) {
    var _b = _a.title,
        title = _b === void 0 ? "Select" : _b,
        children = _a.children,
        onChange = _a.onChange;
    var _c = React.useState(title),
        state = _c[0],
        setState = _c[1];
    var _d = React.useState(false),
        isOpen = _d[0],
        setIsOpen = _d[1];
    var ref = React.useRef(null);
    React.useEffect(
        function () {
            function handleClickOutside(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return function () {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        },
        [ref, setIsOpen]
    );
    function handleStateChange(e) {
        var el = e.target;
        setState(el.dataset.title);
        onChange(el.dataset.value);
        setIsOpen(false);
    }
    return (
        <div>
            <div className="dropDown">
                <div
                    onClick={function () {
                        return setIsOpen(function (prev) {
                            return !prev;
                        });
                    }}
                    className="main"
                >
                    <p className="dropDown__title">{state}</p>
                    <svg viewBox="0 0 24 24">
                        <g>
                            <path d="M12,14.071L8.179,10.25c-0.414-0.414-1.086-0.414-1.5,0l0,0c-0.414,0.414-0.414,1.086,0,1.5l4.614,4.614 c0.391,0.391,1.024,0.391,1.414,0l4.614-4.614c0.414-0.414,0.414-1.086,0-1.5v0c-0.414-0.414-1.086-0.414-1.5,0L12,14.071z" />
                        </g>
                    </svg>
                </div>
                {isOpen ? (
                    <div
                        ref={ref}
                        onClick={handleStateChange}
                        className="dropDown__body"
                    >
                        {children}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
export var DropDownItem = function (_a) {
    var title = _a.title,
        value = _a.value;
    return (
        <div data-value={value} data-title={title} className="dropDownItem">
            <p data-title={title} data-value={value}>
                {title}
            </p>
        </div>
    );
};
//# sourceMappingURL=DropDown.jsx.map
