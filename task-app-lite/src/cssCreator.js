const fs=require('fs');


exports.writeCss=(size,iconSize)=>{
	const data=`
.iconButton {
    height: ${size}px;
    width: ${size}px;
    color: rgba(0, 0, 0, 0.54);
    overflow: visible;
    text-align: center;
    transition: background-color 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    position: relative;
}

.iconButton:hover,
.iconButton:active {
    background-color: rgba(255, 95, 130, 0.226);
}
.iconButton:active > .iconButton__ripple {
    animation: ripple 700ms cubic-bezier(0.4, 0, 0.2, 1) 0ms forwards;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

@keyframes ripple {
    from {
        height: 0;
        width: 0;
    }
    to {
        height: 100%;
        width: 100%;
    }
}

.iconButton__ripple {
    position: absolute;
    background-color: rgba(255, 94, 129, 0.589);
    align-self: center;
    justify-self: center;
    border-radius: 50%;
}

.iconButton__icon {
    height: ${iconSize}px;
    width: ${iconSize}px;
}
`;

	fs.writeFile("./IconButtonStyle.css",data,"utf-8",(err)=>{
		console.log("File Wrote");
	})
}
