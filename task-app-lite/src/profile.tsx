import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { selectUser } from './features/userSlice.js';

interface Props {
    showInfo: (v: boolean) => void;
}

const Profile: React.FC<Props> = ({ showInfo }) => {
    const ref = useRef(null);
    const userData = useSelector(selectUser).userData;
    const totalCompleted = JSON.parse(localStorage.getItem('userData')!).totalCompleted!;
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !(ref.current! as HTMLElement).contains(e.target as HTMLElement)) {
                showInfo(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, showInfo]);

    return (
        <div ref={ref} className='profile'>
            <div className='profile__info'>
                <img src='./google.svg' alt='google' />
                <div className='profile__data'>
                    <label>{userData?.name}</label>
                    <label>{userData?.from}</label>
                </div>
            </div>
            <div className='profile__tasksCount'>
                <p className='profile__tasksCount--title'>Total Completed:</p>
                <CountUp end={totalCompleted} duration={3} delay={0.3} />
            </div>
        </div>
    );
};

export default Profile;
