import React, { useState, useEffect } from "react";

function getSavedValue(key:string, initialValue:object) {
	const savedValue = JSON.parse(localStorage.getItem(key)!);
	if (savedValue) return savedValue;

	if (initialValue instanceof Function) return initialValue();

	return initialValue;
}


const useLocalStorage = (key:string, initialValue:object) => {
	const [value, setValue] = useState(() => {
		return getSavedValue(key, initialValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;