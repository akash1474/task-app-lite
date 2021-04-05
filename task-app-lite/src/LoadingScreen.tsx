import React from 'react';
import {CircularProgress} from './react-custom-ui-components';
export default function LoadingScreen(){
	return (
		<div className="loadingScreen">
			<CircularProgress/>
		</div>
		)
}