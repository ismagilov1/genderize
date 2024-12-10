import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gender, setGender] = useState();
  const [name, setName] = useState();
  // https://api.genderize.io?name=Pavel
  let requestObj = {};

  async function getGender(nameToCheck) {
    return await fetch(`https://api.genderize.io?name=${nameToCheck}`).then(
      (response) => response.json().then((result) => (requestObj = result))
    );
  }

  async function checkGender(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    setName(name);
    const newGender = await getGender(name);
    setGender(newGender);
    localStorage.setItem("data", JSON.stringify(requestObj));
  }

  useEffect(() => {
    if (localStorage) {
      const localData = localStorage.getItem("data");
      const parseData = JSON.parse(localData);
      setGender(parseData.gender);
      setName(parseData.name);
    }
  }, [gender]);

  return (
    <>
      <div className="app">
        <form onSubmit={checkGender}>
          <input name="name" className="input" id="name" type="text" />
          <button>Check</button>
          <p>
            History:
            {gender === "male" ? (
              <p>{name}-Male</p>
            ) : gender === "female" ? (
              <p>{name}-Female</p>
            ) : (
              <p>Unknown</p>
            )}
          </p>
        </form>
      </div>
    </>
  );
}

export default App;
