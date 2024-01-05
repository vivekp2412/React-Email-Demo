import { useRef, useState } from "react";
import { extractVariables, setLocalStorage } from "src/utils";
import { v4 as uuidv4 } from "uuid";
import Input from "src/Components/ui/Input/Input";
import "./index.css";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Template } from "src/Types";
/**
 * Component to make a new Email template
 * @returns {JSX.Element} The Component comprising React-Email-Editor,Submit button and Name input field
 */
const AddMailTemplate = () => {
  // const [htmlContent, setHtmlContent] = useState<string>(""); //State for HTML Content of Mail
  const [templateName, setTemplateName] = useState<string>(""); //State for Template Name
  const emailEditorRef = useRef<EditorRef>(null); //Ref for the Editor

  //Checks the Empty Editor returns a Promise of type Boolean
  const isEmpty = async () => {
    const unlayer = emailEditorRef.current?.editor;

    return new Promise<boolean>((resolve, reject) => {
      unlayer?.exportHtml((data) => {
        // Extract the design body from the exported data
        const {
          design: { body },
        } = data;
        const { rows } = body;
        let isEmpty = true;

        // Iterate through rows and columns to check for contents
        label: for (let i = 0; i < rows.length; i++) {
          const { columns } = rows[i];
          for (let j = 0; j < columns.length; j++) {
            const { contents } = columns[j];

            // If contents are present, set isEmpty to false and break out of the loop
            if (contents.length) {
              isEmpty = false;
              break label;
            }
          }
        }

        // Resolve the promise with the isEmpty result
        resolve(isEmpty);
      });
    });
  };

  //Handles Adding Template Details to Database
  const saveTemplate = async (htmlContent: string) => {
    //Checking for Empty Editor
    const isEditorEmpty = await isEmpty();
    //Extracting the Variables from Html
    const variables = extractVariables(htmlContent);

    //Checking for Empty values of Name and content
    if (templateName && !isEditorEmpty) {
      const data: Template = {
        id: uuidv4(),
        name: templateName,
        content: htmlContent,
        variables,
      };

      //saving Data to LocalStorage
      setLocalStorage<Template>("template", data);

      //Reseting the Editor and Input field After Saving
      setTemplateName("");
    } else {
      alert("Please fill alll the field");
      return;
    }
  };

  //Handles Clearing the Editor
  const clearEditor = () => {
    const unlayer = emailEditorRef.current?.editor;
    //Loading the Blank Editor
    unlayer?.loadBlank({
      backgroundColor: "#e7e7e7",
    });
  };

  // Handles Generating HTMl from Editor and Setting the State Value
  const generateHtml = () => {
    return new Promise<string>((resolve, reject) => {
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.exportHtml((data) => {
        const { html } = data;
        // setHtmlContent(html);
        resolve(html);
      });
    });
  };

  //Handles Generating and Saving Template to Database
  const generateAndSave = async () => {
    try {
      const html = await generateHtml();

      await saveTemplate(html);
      clearEditor();
    } catch (error) {
      console.error("Error exporting HTML:", error);
    }
  };

  return (
    <>
      <p>
        Note: Please Add Dynamic Values in Double curly brackets e.g{" "}
        {"{{user}}"}
      </p>

      <div>
        <EmailEditor ref={emailEditorRef} />
      </div>
      <Input
        value={templateName}
        isRequired={true}
        className={"inputBox"}
        labelFor={"templateName"}
        labelText={"Template Name"}
        type={"text"}
        onChangeHandler={(e) => setTemplateName(e.target.value)}
      />
      <div>
        <button onClick={generateAndSave}>Add Template</button>
      </div>
    </>
  );
};

export default AddMailTemplate;
