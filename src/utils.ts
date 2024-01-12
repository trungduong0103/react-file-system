import fs from "fs";
import path from "path";
import { FileObject } from "./File.model";

const isFolder = (path: string): boolean => {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
};

const readDir = (
  readPath: string,
  includeRoot: boolean = true
): FileObject[] => {
  if (!isFolder(readPath)) throw new Error("readPath must be path to folder");

  // must use readdirSync to keep object index intact
  const objects = fs.readdirSync(readPath);

  const children = objects.map((fileName) => {
    const filePath = path.join(readPath, fileName);
    const objectIsFolder = isFolder(filePath);

    return {
      fileName,
      fileType: objectIsFolder ? "folder" : "file",
      files: objectIsFolder ? readDir(filePath, false) : null
    };
  });

  if (includeRoot) {
    return [
      {
        fileName: path.basename(readPath),
        fileType: "folder",
        files: children
      }
    ] as FileObject[];
  }

  return children as FileObject[];
};

export { readDir };
