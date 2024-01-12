import React from "react";
import { readDir, readDir2 } from "./utils";
import "./styles.css";
import { FileObject } from "./File.model";

// [x] Read a directory
// [x] Print out all the files and folder
// [x] Check if object is a file or folder

// Component for file
// Render
/*
  folder
    subfolder
      subfolder_file1
      subfolder_file2
        sub_subfolder 
          sub_subfolder_file1
          sub_subfolder_file2
    file1
    file2

*/

// TODO: handle depth
// Check empty folder ??

interface FileProps {
  file: FileObject;
  children?: JSX.Element | JSX.Element[];
}

function File({ file, children }: FileProps) {
  const [toggle, setToggle] = React.useState(false);
  const hasChildren = !!React.Children.count(children);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <span
          style={{
            display: "inline-block",
            cursor: hasChildren ? "pointer" : "text"
          }}
          onClick={() => setToggle((prev) => !prev)}
        >
          [{file.fileType}] {file.fileName}
        </span>
      </div>
      {toggle && children && <div style={{ marginLeft: 20 }}>{children}</div>}
    </div>
  );
}

function renderObjects(objects: FileObject[]) {
  return objects.map((object) => {
    if (!object.files) {
      return <File key={object.fileName} file={object} />;
    }

    return (
      <File
        key={object.fileName}
        file={object}
        children={renderObjects(object.files)}
      />
    );
  });
}

export default function App() {
  // map returns new objects everytime, consider memo
  const [objects, setObjects] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    let readObjects = readDir("./src/folder");

    // setReadObjs(readObjects);
    setObjects(renderObjects(readObjects));
  }, []);

  return (
    <div>
      {/* <div style={{ padding: 15, border: "1px solid black", marginBottom: 15 }}>
        JSON Structure:
        <br />
        {JSON.stringify(readObjs)}
      </div> */}
      <div className="App">
        <div>{objects}</div>
      </div>
    </div>
  );
}
