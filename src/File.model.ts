export interface FileObject {
  fileName: string;
  fileType: "file" | "folder";
  files: FileObject[] | null;
}
