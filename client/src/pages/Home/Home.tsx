import { useNavigate } from "react-router-dom";
import Button from "src/Components/ui/Button/Button";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to the Seat Booking App</h1>
      <Button
        title="Create A  Template"
        onClickHandler={() => navigate("/addTemplate")}
      />
      <Button
        title="Send Saved Template"
        onClickHandler={() => navigate("/savedTemplate")}
      />
      <Button title="Custom Created" 
        onClickHandler={() => navigate("/sendMail")}
      
      />
    </>
  );
};
export default Home;
