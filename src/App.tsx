import { useState } from "react";
import "./App.css";

import DownloadButton from "./components/DownloadButton/DownloadButton";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";


function App() {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | boolean>(false);
  const [ downloadUrl, setDownloadUrl ] = useState<string | boolean>(false);

  const getDownloadUrl = (url: string) => {
    setDownloadUrl(url)
  };

  const showError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <main className="main">
      <Loader isLoading={isLoading} />
      {downloadUrl && <DownloadButton />}
      <Footer />
    </main>
  );
};

export default App;
