import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTask, editTask } from "./features/taskSlice";
import { updateTask } from "./api/index";
import Lottie from "react-lottie";
import animationData from "./assets/lottieFiles/checkGreen.json";
import starAnimation from "./assets/lottieFiles/star.json";
import TaskPage from "./taskPage";
import moment from "moment";
import { categories } from "./utils";
import { IconButton } from "./react-custom-ui-components/main";
import { Task as TaskInterface } from "./@types";

interface Props {
  id: string;
  title: string;
  category: number;
  isCompleted: boolean;
  isImportant: boolean;
  expectedDate: number;
}

const Task: React.FC<Props> = ({
  id,
  title,
  category,
  isCompleted,
  isImportant,
  expectedDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tasks = useSelector(selectTask);
  const dispatch = useDispatch();
  const currentTask = tasks.find((task: TaskInterface) => task.id === id);
  const currentCategory = categories[category];
  function changeStateCompleted() {
    dispatch(editTask({ ...currentTask, isCompleted: !isCompleted }));
    updateTask(currentTask.userId, currentTask.id, {
      isCompleted: !isCompleted,
    }).then((task) => {
      dispatch(editTask(task.data.data.task));
    });
  }

  function changeStateImportant() {
    dispatch(editTask({ ...currentTask, isImportant: !isImportant }));
    updateTask(currentTask.userId, currentTask.id, {
      isImportant: !isImportant,
    }).then((task) => {
      dispatch(editTask(task.data.data.task));
    });
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsStar = {
    loop: false,
    autoplay: true,
    animationData: starAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <TaskPage id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="task">
        <div onClick={changeStateCompleted} className="task__checkbox">
          {isCompleted ? (
            <Lottie
              direction={isCompleted ? 1 : -1}
              height={26}
              width={26}
              options={defaultOptions}
            />
          ) : (
            <IconButton color="#0CB293" customSize={4}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2 z M 12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4 z" />
              </svg>
            </IconButton>
          )}
        </div>
        <div className="task__info">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="task__info--title"
          >
            {title}
          </div>
          <div className="task__info--sub">
            <div
              style={{ backgroundColor: currentCategory.color }}
              className="sub task__category"
            >
              {currentCategory.name}
            </div>
            <div className="sub task__expectedDate">
              {moment(expectedDate).format("MMMM DD")}
            </div>
          </div>
        </div>
        <div className="task__important" onClick={changeStateImportant}>
          {isImportant ? (
            <div className="lottie__star">
              <Lottie
                direction={isImportant ? 1 : -1}
                height={26}
                width={26}
                options={defaultOptionsStar}
              />
            </div>
          ) : (
            <IconButton customSize={5}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <path d="M13.03125 1.15625C12.957031 1.160156 12.882813 1.167969 12.8125 1.1875C12.496094 1.25 12.230469 1.457031 12.09375 1.75L8.84375 8.375L1.46875 9.46875C1.105469 9.535156 0.804688 9.796875 0.695313 10.152344C0.582031 10.507813 0.675781 10.894531 0.9375 11.15625L6.21875 16.34375L5 23.65625C4.9375 24.027344 5.085938 24.40625 5.390625 24.632813C5.695313 24.855469 6.101563 24.890625 6.4375 24.71875L13 21.25L19.5625 24.71875C19.898438 24.890625 20.304688 24.855469 20.609375 24.632813C20.914063 24.40625 21.0625 24.027344 21 23.65625L19.78125 16.34375L25.0625 11.15625C25.324219 10.894531 25.417969 10.507813 25.304688 10.152344C25.195313 9.796875 24.894531 9.535156 24.53125 9.46875L17.15625 8.375L13.90625 1.75C13.75 1.402344 13.414063 1.171875 13.03125 1.15625 Z M 13 4.46875L15.625 9.75C15.773438 10.039063 16.054688 10.238281 16.375 10.28125L22.21875 11.15625L18 15.28125C17.757813 15.503906 17.640625 15.832031 17.6875 16.15625L18.6875 22L13.46875 19.25C13.175781 19.09375 12.824219 19.09375 12.53125 19.25L7.3125 22L8.3125 16.15625C8.359375 15.832031 8.242188 15.503906 8 15.28125L3.78125 11.15625L9.625 10.28125C9.945313 10.238281 10.226563 10.039063 10.375 9.75Z" />
              </svg>
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
