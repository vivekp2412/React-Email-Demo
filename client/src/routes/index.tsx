import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddMailTemplate from "src/pages/AddMailTemplate";
import Emailsender from "src/pages/EmailSender";
import Home from "src/pages/Home";
import SavedTemplate from "src/pages/SavedTemplate/SavedTemplate";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sendmail" element={<Emailsender />} />
        <Route path="/addTemplate" element={<AddMailTemplate />} />
        <Route path="/savedTemplate" element={<SavedTemplate />} />
        
      </Routes>
    </BrowserRouter>
  );
};
