// src/components/TextEditor.tsx
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./index.css";
interface TextEditorProps {
  onTextChange: (text: string) => void;
  clearEditor: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onTextChange,
  clearEditor,
}) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (value: string) => {
    setText(value);
    onTextChange(value);
  };
  useEffect(() => {
    // Reset the text when clearTextTrigger changes
    if (clearEditor) {
      setText("");
    }
  }, [clearEditor]);

  return (
    <ReactQuill
      className="editor"
      value={text}
      onChange={handleTextChange}
      placeholder="Type something..."
    />
  );
};

export default TextEditor;
