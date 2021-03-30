import React,{useRef ,useEffect} from 'react';
import CountUp from 'react-countup';
import { User } from './@types';
// import LineGraph from './LineGraph';
interface Props{
	userData: User;
	showInfo: (v: boolean) => void;
}

const Profile:React.FC<Props>=({userData,showInfo})=>{
	const ref=useRef(null);

	useEffect(()=>{
		function handleClickOutside(e:MouseEvent) {
			if (ref.current && !(ref.current! as HTMLElement).contains(e.target as HTMLElement)) {
				showInfo(false);
            }
        }
		document.addEventListener("mousedown",handleClickOutside);
		return ()=>{
			document.removeEventListener("click",handleClickOutside);
		}
	},[ref,showInfo]);

	return (
		<div ref={ref} className="profile">
			<div className="profile__info">
				<img src="./google.svg" alt="google"/>
				<div className="profile__data">
					<label>{userData?.name}</label>
					<label>{userData?.from}</label>
				</div>
			</div>
			<div className="profile__tasksCount">
				<p className="profile__tasksCount--title">Total Completed:</p>
				<CountUp
					end={userData?.totalCompleted}
					duration={3}
					delay={0.3}
				/>
			</div>
			{/* <LineGraph/>*/}
		</div>
		);
}

export default Profile;