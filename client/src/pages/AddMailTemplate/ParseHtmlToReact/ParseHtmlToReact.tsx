import parse from "html-react-parser";
import { findAndReplaceVariable } from "src/utils";
//Interface for the Comman Template Props
interface ParseHtmlToReactProps {
  html: string;
  variableData: Record<string, string>;
}
/**
 * Comman Temp Takes HTMLContent as String and Variable Data Object and Renders it as a React Component
 * @param {CommonTempProps} props-The Props for the Comman Template
 * @param {Object}  props.data- The Object Containing the Value of Variables in JSX
 * @param {string}  props.html- The String of the Html content
 * @returns
 */
const ParseHtmlToReact = ({ variableData, html }: ParseHtmlToReactProps) => {
  //Extracting the Keys from Variable Data Object
  const key = Object.keys(variableData);
  let htmlContent = html;

  //Iterationg through all the keys and Replacing it value in HTMl Content
  key.forEach((variable) => {
    if (variableData[variable]) {
      htmlContent = findAndReplaceVariable(
        htmlContent, //String Content
        `${variable}`, //Variable Name
        variableData[variable] //Variable Value
      );
    }
  });
  //Converting Sting HTML to React Element
  return <>{parse(htmlContent)}</>;
};
export default ParseHtmlToReact;
