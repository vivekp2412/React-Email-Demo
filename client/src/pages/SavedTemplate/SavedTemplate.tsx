import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

// import "./index.css";
// import CommonTemp from "../AddMailTemplate/ParseHtmlToReact/ParseHtmlToReact";
import Input from "src/Components/ui/Input/Input";
import ParseHtmlToReact from "src/pages/AddMailTemplate/ParseHtmlToReact/index";
import { render } from "@react-email/render";
import LoginTemplate from "./template/Login";
import RegistrationTemplate from "./template/Registation";
ParseHtmlToReact;
/**
 * Email Sender Component that Handles Sending Mail Comprising the Template
 * SelectMenu, Input Fields for Variables and Send Button which Calls the API
 * @returns {JSX.Element}
 */
//Env Variable Object
const env = import.meta.env;

const SavedTemplate = () => {
  // State to manage the selected template and variable data
  const [template, setTemplate] = useState<string | null>("login");
  const [html, setHtml] = useState<string>("");
  const [variableData, setVariableData] = useState<Record<string, string>>({});
  useEffect(() => {
    let htmlContent;
    switch (template) {
      case "login":
        htmlContent = render(
          <LoginTemplate username="vivek" showImage={true} />
        );
        setHtml(htmlContent);
        break;
      case "registration":
        htmlContent = render(<RegistrationTemplate username="vivek" />);
        setHtml(htmlContent);

        break;
      default:
        break;
    }
  }, [template]);
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${env.VITE_APP_URL}/mail`; //URl for Server Api Call

    try {
      // Send the HTML content and template subject to the server
      const data = await axios.post(
        url,
        {
          htmlTemp: html,
          subject: template,
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

  // Create input fields for template variables
  //   const inputFields = template?.variables?.map((variable, index) => (
  //     <div className="inputField" key={index}>
  //       <Input
  //         type={"text"}
  //         isRequired
  //         value={variableData[`${variable}`]}
  //         labelFor={`${variable}`}
  //         labelText={`${variable}`}
  //         onChangeHandler={(e) =>
  //           setVariableData((prev) => ({
  //             ...prev,
  //             [`${variable}`]: e.target.value,
  //           }))
  //         }
  //       ></Input>
  //     </div>
  //   ));

  return (
    <>
      <div className="formContainer">
        {/* Form for selecting template and entering variable data */}
        <form onSubmit={handleSubmit} className="form">
          <div className="menu">
            {/* Dropdown for selecting template */}
            <select onChange={(e) => setTemplate(e.target.value)}>
              <option value={"login"}>Login</option>
              <option value={"registration"}>Registration</option>
            </select>
          </div>

          {/* Input fields for template variables */}
          {/* <div className="inputField">{inputFields}</div> */}

          {/* Submit button */}
          <button type="submit">Send Mail</button>
        </form>
      </div>
      {/**Preview Container */}
      <div className="preview_container">
        <h3>Preview</h3>
        <iframe className="iframe" srcDoc={html}></iframe>
      </div>
    </>
  );
};

export default SavedTemplate;
