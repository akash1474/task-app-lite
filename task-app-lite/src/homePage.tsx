import React from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { loadData } from "./features/taskSlice";
import TaskContainer from "./TaskContainer";
import InputController from "./InputController";
import { getTasks } from "./api/index";

export default function HomePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const userSettings = user.userSettings;
  document.getElementById("root")!.style.background = userSettings.useGradient
    ? `linear-gradient(45deg, ${userSettings!.bgColor}, ${
        userSettings!.bgColor
      }b3)`
    : userSettings.bgColor!;

  React.useEffect(() => {
    getTasks(user.userData.id).then((data) => {
      const dbTasks=data.data.doc.map((el:any)=>{
        return {
          ...el,
          sync:true,
        }
      })
      dispatch(loadData(dbTasks));
    });
  }, [user.userData.id, dispatch]);
  return (
    <>
      <Header userData={user.userData} />
      <TaskContainer />
      <InputController imgSrc="./calendar.svg" />
    </>
  );
}
