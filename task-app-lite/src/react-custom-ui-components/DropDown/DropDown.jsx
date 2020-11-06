import * as React from 'react';
import './DropDown.css';
export var DropDown = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Select" : _b, children = _a.children, onChange = _a.onChange;
    var _c = React.useState(title), state = _c[0], setState = _c[1];
    var _d = React.useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var ref = React.useRef(null);
    React.useEffect(function () {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    function handleStateChange(e) {
        var el = e.target;
        setState(el.dataset.title);
        onChange(el.dataset.value);
        setIsOpen(false);
    }
    return (<div>
            <div className="dropDown">
            <div onClick={function () { return setIsOpen(function (prev) { return !prev; }); }} className="main">
                <p className="dropDown__title">{state}</p>
                <svg viewBox="0 0 451.847 451.847">
                <g>
                    <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
                </g>
                </svg>
            </div>
            {isOpen ? <div ref={ref} onClick={handleStateChange} className="dropDown__body">
                {children}
            </div> : null}
        </div>
        </div>);
};
export var DropDownItem = function (_a) {
    var title = _a.title, value = _a.value;
    return (<div data-value={value} data-title={title} className="dropDownItem">
            <p data-title={title} data-value={value}>{title}</p>
        </div>);
};
//# sourceMappingURL=DropDown.jsx.map