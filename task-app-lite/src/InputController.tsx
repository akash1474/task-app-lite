import React, { useState } from "react";
import { IconButton, Calendar } from "./react-custom-ui-components/main";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { addTask, clearAllTasks, updateTask,selectTask } from "./features/taskSlice";
import CategoryPicker from "./categoryPicker";
import { categories } from "./utils";
import { createTask } from "./api/index";
import { v4 as uuidv4 } from "uuid";
import {ReactComponent as CategoryIcon} from './assets/icons/category2.svg'

interface Props {
  imgSrc: string;
}

const InputController: React.FC<Props> = ({ imgSrc }) => {
  const [text, setText] = useState("");
  const userId = useSelector(selectUser).userData.id;
  const tasksLength=useSelector(selectTask).length;
  const [isOpenCateogry, setIsOpenCategory] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [categoryMode, setCategoryMode] = useState(false);
  let selectedDate: number;
  const inputContainer = React.useRef(null);
  const input = React.useRef(null);
  const dispatch = useDispatch();

  const goToDefault = () => {
    setText("");
    setCategory(categories[0]);
    setCategoryMode(false);
  };

  function submitData(e: React.FormEvent) {
    e.preventDefault();
    if (text.length < 1) return;
    (inputContainer.current! as HTMLDivElement).style.backgroundColor =
      "#e8e8e8";
    if (text.startsWith("$del_all")) {
      alert("Are you sure you want to delete all tasks?");
      dispatch(clearAllTasks());
      goToDefault();
      return;
    }
    const categoryIndex = categories.findIndex(
      (cat) => cat.name === category.name
    );
    let newTask = {
      title: text,
      category: categoryIndex,
      expectedDate: selectedDate || new Date().getTime(),
      createdAt: new Date().getTime(),
      isCompleted: false,
      isImportant: false,
      isEvent: false,
      _id2: uuidv4(),
      id: uuidv4(),
	  pos:tasksLength
    };
    dispatch(addTask({...newTask,sync:false}));
    goToDefault();
    createTask(userId, newTask).then((task) => {
      dispatch(updateTask({ ...task.data.data.task, _id2: newTask._id2,sync:true,pos:tasksLength }));
    });
  }

  const applySettings = (type: string) => {
    const cat = categories.findIndex((el) => el.name === type);
    (inputContainer.current! as HTMLDivElement).style.backgroundColor =
      categories[cat].color;
    setCategory(categories[cat]);
    setText("");
  };

  const decodeInput = (str: string) => {
    let value = str;
    if (value.indexOf("#") >= 0) {
      setCategoryMode(true);
      const split = str.split(" ")[0].length > 3;
      if (split) {
        switch (value.split(" ")[0]) {
          case "#pro":
            applySettings("Programming");
            value = "";
            break;
          case "#task":
            applySettings("Task");
            value = "";
            break;
          case "#health":
            applySettings("Health");
            value = "";
            break;
          case "#personal":
            applySettings("Personal");
            value = "";
            break;
          case "#study":
            applySettings("Study");
            value = "";
            break;
        }
      }
    }
    setText(value);
  };

  return (
    <div className="inputController">
      <div className="inputController__section" ref={inputContainer}>
        <Calendar
          float="left"
          onChange={(val: Date) => {
            selectedDate = val.getTime();
          }}
        />
        <form onSubmit={submitData}>
          <input
            className="inputController__input"
            value={text}
            ref={input}
            onChange={(e) => decodeInput(e.target.value)}
            onFocus={() => setIsOpenCategory(false)}
            type="text"
            placeholder={categoryMode ? "" : "Task"}
          />
        </form>
      </div>
      {isOpenCateogry ? (
        <CategoryPicker
          setCategory={setCategory}
          showCategoryPicker={setIsOpenCategory}
        />
      ) : null}
      <IconButton
        onClick={() => setIsOpenCategory((prev) => !prev)}
        color="#404040"
      >
        <CategoryIcon height={20} width={20}/>
      </IconButton>
    </div>
  );
};

export default InputController;
