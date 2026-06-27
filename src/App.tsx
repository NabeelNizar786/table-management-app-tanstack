import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      console.log(import.meta.env.VITE_API_BASE_URL);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/records?_page=1&_limit=5`,
      );
      console.log(response.data);
    };

    fetchData();
  }, []);

  return <div>App</div>;
}

export default App;
