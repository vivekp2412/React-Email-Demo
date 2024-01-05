import axios from "axios";
import { FormEvent, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { getLocalStorage } from "src/utils";
import { Template } from "src/Types";
import "./index.css";
// import CommonTemp from "../AddMailTemplate/ParseHtmlToReact/ParseHtmlToReact";
import Input from "src/Components/ui/Input/Input";
import ParseHtmlToReact from "src/pages/AddMailTemplate/ParseHtmlToReact/index";
import { render } from "@react-email/render";
import LoginTemplate from "../SavedTemplate/template/Login";
ParseHtmlToReact;
/**
 * Email Sender Component that Handles Sending Mail Comprising the Template
 * SelectMenu, Input Fields for Variables and Send Button which Calls the API
 * @returns {JSX.Element}
 */
//Env Variable Object
const env = import.meta.env;

const Emailsender = () => {
  // Retrieve template data from local storage
  const templateData = getLocalStorage<Template>("template");

  // State to manage the selected template and variable data
  const [template, setTemplate] = useState<Template | null>(
    templateData && templateData[0]
  );

  const [variableData, setVariableData] = useState<Record<string, string>>({});

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${env.VITE_APP_URL}/mail`; //URl for Server Api Call

    // Find the selected template
    const selectedTemplate = templateData?.find(
      (temp) => temp.name === template?.name
    );
    //FOR EDITOR
    // Render the HTML using the selected template by passing HTML content and Variable data as Props
    const html = ReactDOMServer.renderToString(
      <ParseHtmlToReact
        html={selectedTemplate?.content ?? ""}
        variableData={variableData}
      />
    );
    //FOR REACT_EMAIL
    // const html = render(<RegistrationTemplate username="vivek" />, {
    //   pretty: true,
    // });
  
    try {
      // Send the HTML content and template subject to the server
      const data = await axios.post(
        url,
        {
          htmlTemp: html,
          subject: template?.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful (status code 200)
      if (data.status === 200) {
        // Reset variable data after sending the email
        for (let key in variableData) {
          setVariableData((prev) => ({ ...prev, [`${key}`]: " " }));
        }
        console.log("sent successfully");
      }
    } catch (error) {
      console.log("Failed to send", "Error Message:", error);
    }
  };

  // Create select options for templates
  const selectOptions = templateData?.map((template) => (
    <option value={template.name}>{template.name}</option>
  ));

  // Create input fields for template variables
  const inputFields = template?.variables?.map((variable, index) => (
    <div className="inputField" key={index}>
      <Input
        type={"text"}
        isRequired
        value={variableData[`${variable}`]}
        labelFor={`${variable}`}
        labelText={`${variable}`}
        onChangeHandler={(e) =>
          setVariableData((prev) => ({
            ...prev,
            [`${variable}`]: e.target.value,
          }))
        }
      ></Input>
    </div>
  ));

  return (
    <>
      <div className="formContainer">
        {/* Form for selecting template and entering variable data */}
        <form onSubmit={handleSubmit} className="form">
          <div className="menu">
            {/* Dropdown for selecting template */}
            <select
              onChange={(e) =>
                setTemplate(
                  templateData?.find(
                    (template) => template.name === e.target.value
                  ) ?? null
                )
              }
            >
              {selectOptions}
            </select>
          
          </div>

          {/* Input fields for template variables */}
          <div className="inputField">{inputFields}</div>

          {/* Submit button */}
          <button type="submit">Send Mail</button>
        </form>
      </div>
      {/**Preview Container */}
      <div className="preview_container">
        <h3>Preview</h3>
        <iframe
          className="iframe"
          srcDoc={ReactDOMServer.renderToString(
            <ParseHtmlToReact
              html={template?.content ?? ""}
              variableData={variableData}
            />
          )}
        ></iframe>
      </div>
    </>
  );
};

export default Emailsender;
