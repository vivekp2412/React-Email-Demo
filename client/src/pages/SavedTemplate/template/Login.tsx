import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";


interface LoginPropsType {
  username: string;
  showImage:boolean
}
const LoginTemplate = ({ username,showImage }: LoginPropsType) => {
  // const [image,setImage]=useState(showImage);
  return (
    <>
      <Html>
        
        <Heading as="h1">Your Custom Email Saved Template</Heading>
        <Text>
          Dear {username}, Hope you're doing good. Thank You for login
        </Text>
      </Html>
    </>
  );
};
export default LoginTemplate;
