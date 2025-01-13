import { useState } from "react";
import "./App.css";

import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";

function App() {
  const [ isLoading, setIsLoading ] = useState(false);

  const switchLoading = () => {
    setIsLoading((prev) => !prev);
  };

  return (
    <main className="main">

      <Loader isLoading={isLoading} />

      <Form switchLoading={switchLoading} />

      <Footer />
    </main>
  );
};

export default App;
