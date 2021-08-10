import React, { useState } from "react";
import ReactDom from "react-dom";
import { storage } from "./firebase.js";
import { v4 as V4 } from "uuid";
import * as API from "./api/index";
import { useSelector, useDispatch } from "react-redux";
import { editTask, removeTask, selectTask } from "./features/taskSlice";
import { categories } from "./utils";
import { ReactComponent as Check } from "./assets/icons/check.svg";
import { ReactComponent as Error } from "./assets/icons/error.svg";

import { ReactComponent as Spinner } from "./assets/icons/spinner.svg";
import {
  IconButton,
  DropDown,
  DropDownItem,
  Calendar,
  Button,
} from "./react-custom-ui-components/main";
import { ReactComponent as FileIcon } from "./assets/icons/file3.svg";
import Overlay from "./overlay";
import IconProvider from "./iconsProvider";
import { Task } from "./@types";

interface Props {
  id: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const TasKPage: React.FC<Props> = ({ id, isOpen, setIsOpen }) => {
  const tasks = useSelector(selectTask);
  const dispatch = useDispatch();
  let file: any = null;
  const [changes, setChanges] = useState(false);
  const [uploadState, setUploadState] = useState<{
    error: boolean;
    style: object;
    title: string;
    icon: any;
  }>({
    error: false,
    style: { opacity: 0, bottom: 5 },
    title: "Upload File",
    icon: <FileIcon />,
  });
  const currentTask = tasks.find((task: Task) => task.id === id);
  const [imageUrl, setImageUrl] = useState<{
    url: string;
    name: string;
  }>(
    currentTask.imageUrl || {
      url: null,
      name: null,
    }
  );

  let selectedDate: number | null = currentTask.expectedDate;
  const uploadElement = React.useRef(null);
  const progressBar = React.useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState(currentTask.category);

  const [text, setText] = useState(() => {
    if (id) {
      return currentTask.title;
    } else {
      return null;
    }
  });

  const syncToDB = (url: string) => {
    setChanges(true);
    API.updateImageUrl(currentTask.userId, currentTask.id, imageUrl).then(
      (res) => {
        setImageUrl((prev) => {
          return {
            ...prev,
            url,
          };
        });
      }
    );
  };

  const [info, setInfo] = useState<string>(currentTask.description || "");
  React.useEffect(() => {
    if (imageUrl.name) {
      storage
        .ref(currentTask.userId)
        .child(imageUrl.name)
        .getDownloadURL()
        .then((url) => {
          syncToDB(url);
        });
    }
  }, []);

  if (!isOpen) return null;

  function handleSave() {
    const updatedTask = {
      ...currentTask,
      title: text,
      imageUrl,
      category: category,
      description: info,
      expectedDate: selectedDate,
      sync:false,
    };

    if (imageUrl.name) {
      updatedTask.imageUrl = imageUrl;
    }

    if (updatedTask.title.length !== 0) {
      dispatch(editTask(updatedTask));
      setIsOpen(false);
      API.updateTask(updatedTask.userId, updatedTask.id, updatedTask).then(
        (task) => {
          dispatch(editTask({...task.data.data.task,sync:true}));
        }
      );
    }
  }

  // var storageRef = storage.ref(`${currentTask.userId}`);
  // storageRef.listAll().then(function (result: any) {
  // 	console.log((result.items as [any]).forEach(async(el)=>{
  // 		console.log(await el.getMetadata())
  // 	}))
  // });

  async function handleUpload(e: any) {
    file = e.target.files[0];
    if (file) {
      setUploadState(() => {
        return {
          error: false,
          style: { opacity: 1, bottom: 20 },
          title: "Uploading",
          icon: <Spinner />,
        };
      });
      progressBar.current!.style.setProperty("--color", "#4191FF");
      const fileName = V4();
      setImageUrl((prev) => {
        return {
          ...prev,
          name: fileName,
        };
      });
      const uploadTask = storage
        .ref(`/${currentTask.userId}/${fileName}`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressBar.current!.style.setProperty(
            "--width",
            progress.toString()
          );
          if (progress === 100) {
            setUploadState((prev) => {
              return {
                ...prev,
                title: "Uploaded",
                icon: <Check />,
              };
            });
          }
        },
        (err) => {
          console.log(err);
          setUploadState((prev) => {
            return {
              ...prev,
              title: "Upload Failed",
              icon: <Error />,
              error: true,
            };
          });
          progressBar.current!.style.setProperty("--color", "#FF3A73");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url: string) => {
            setImageUrl((prev) => {
              return {
                ...prev,
                url,
              };
            });
          });

          setTimeout(() => {
            file = null;
            setUploadState((prev) => {
              return {
                ...prev,
                style: { opacity: 0, bottom: 5 },
              };
            });
          }, 1500);
        }
      );
    }
  }

  return ReactDom.createPortal(
    <>
      <Overlay onClick={() => setIsOpen(false)} />
      <div className="taskPage">
        <label className="taskPage__title">Task Infomation</label>
        {imageUrl?.url && (
          <a
            datatype="image/*"
            target="_blank"
            download
            rel="noreferrer"
            href={imageUrl.url}
          >
            <img className="taskPage__image" alt="error" src={imageUrl.url} />
          </a>
        )}
        <input
          placeholder="Task"
          className="taskPage__input"
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />

        <IconButton
          onClick={() => {
            if (changes) {
              handleSave();
            }
            setIsOpen(false);
          }}
          className="taskPage__cross"
          color="#FF3C64"
        >
          {IconProvider("cross")}
        </IconButton>
        <DropDown
          onChange={(val) => setCategory(val)}
          title={categories[currentTask.category].name}
        >
          {categories.map((category, i) => (
            <DropDownItem
              key={category.color}
              value={i.toString()}
              title={category.name}
            ></DropDownItem>
          ))}
        </DropDown>
        <textarea
          value={info}
          placeholder="Description"
          className="taskPage__description"
          onChange={(e) => setInfo(e.target.value)}
          rows={5}
        ></textarea>
        <div className="taskPage__utils">
          <div className="taskPage__datePicker">
          <Calendar
            iconColor="#1ccea0"
            float="bottom"
            showRelativeDate
            showDate
            defaultDate={new Date(currentTask.expectedDate)}
            onChange={(date) => {
              selectedDate = date.getTime();
            }}
          />
        </div>
        <Button
          icon={uploadState.icon}
          title={uploadState.title}
          id="uploadBtn"
          onClick={() => {
            (uploadElement.current! as HTMLInputElement).click();
          }}
        ></Button>
        </div>
        <input
          ref={uploadElement}
          onChange={handleUpload}
          type="file"
          style={{ display: "none" }}
        />
        <div className="taskPage__footer">
          <IconButton
            onClick={() => {
              API.deleteTask(currentTask.userId, currentTask.id).then(() => {
                dispatch(removeTask(currentTask.id));
              });
              setIsOpen(false);
            }}
            className="taskPage__trash"
            color="#FF3C64"
          >
            {IconProvider("trash")}
          </IconButton>
          <button className="taskPage__save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {ReactDom.createPortal(
        <div style={uploadState.style} id="progressBar__container">
          <label>
            {uploadState.error ? "File size greater then 25MB" : "Uploading"}
          </label>
          <div ref={progressBar} className="progress-bar"></div>
        </div>,
        document.body
      )}
    </>,
    document.body
  );
};

export default TasKPage;

