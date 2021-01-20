import React from 'react';

interface Props{
	onClick: (e:React.MouseEvent)=>void;
}
const Overlay:React.FC<Props>=({onClick})=>{
	return <div onClick={onClick} className="overlay"></div>
}

export default Overlay;