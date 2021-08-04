import React, { useState } from "react";
import { IconButton, Calendar } from "./react-custom-ui-components/main";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { addTask, clearAllTasks, updateTask } from "./features/taskSlice";
import CategoryPicker from "./categoryPicker";
import { categories } from "./utils";
import { createTask } from "./api/index";
import { v4 as uuidv4 } from "uuid";

interface Props {
  imgSrc: string;
}

const InputController: React.FC<Props> = ({ imgSrc }) => {
  const [text, setText] = useState("");
  const userId = useSelector(selectUser).userData.id;
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
      id: 12548,
    };
    dispatch(addTask(newTask));
    goToDefault();
    createTask(userId, newTask).then((task) => {
      dispatch(updateTask({ ...task.data.data.task, _id2: newTask._id2 }));
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
        <svg viewBox="0 0 24 24">
          <g
            id="Iconly/Bold/Category"
            stroke="none"
            strokeWidth="1"
            fillRule="evenodd"
          >
            <g
              id="Category"
              transform="translate(2.0, 2.0)"
              fillRule="nonzero"
              fill="#333"
            >
              <path d="M5.9199,11.4697 C7.3299,11.4697 8.4599,12.6107 8.4599,14.0307 L8.4599,14.0307 L8.4599,17.4397 C8.4599,18.8497 7.3299,19.9997 5.9199,19.9997 L5.9199,19.9997 L2.5399,19.9997 C1.1399,19.9997 -0.0001,18.8497 -0.0001,17.4397 L-0.0001,17.4397 L-0.0001,14.0307 C-0.0001,12.6107 1.1399,11.4697 2.5399,11.4697 L2.5399,11.4697 Z M17.46,11.4697 C18.86,11.4697 20,12.6107 20,14.0307 L20,14.0307 L20,17.4397 C20,18.8497 18.86,19.9997 17.46,19.9997 L17.46,19.9997 L14.08,19.9997 C12.67,19.9997 11.54,18.8497 11.54,17.4397 L11.54,17.4397 L11.54,14.0307 C11.54,12.6107 12.67,11.4697 14.08,11.4697 L14.08,11.4697 Z M5.9199,-9.32587341e-14 C7.3299,-9.32587341e-14 8.4599,1.15 8.4599,2.561 L8.4599,2.561 L8.4599,5.97 C8.4599,7.39 7.3299,8.53 5.9199,8.53 L5.9199,8.53 L2.5399,8.53 C1.1399,8.53 -0.0001,7.39 -0.0001,5.97 L-0.0001,5.97 L-0.0001,2.561 C-0.0001,1.15 1.1399,-9.32587341e-14 2.5399,-9.32587341e-14 L2.5399,-9.32587341e-14 Z M17.46,-9.32587341e-14 C18.86,-9.32587341e-14 20,1.15 20,2.561 L20,2.561 L20,5.97 C20,7.39 18.86,8.53 17.46,8.53 L17.46,8.53 L14.08,8.53 C12.67,8.53 11.54,7.39 11.54,5.97 L11.54,5.97 L11.54,2.561 C11.54,1.15 12.67,-9.32587341e-14 14.08,-9.32587341e-14 L14.08,-9.32587341e-14 Z"></path>
            </g>
          </g>
        </svg>
      </IconButton>
    </div>
  );
};

export default InputController;
