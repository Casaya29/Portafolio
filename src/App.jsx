import { useState } from "react";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import Habilidades from "./pages/Habilidades";
import Curriculum from "./pages/Cv";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import "./App.css";

function App() {
  // Guarda el servicio que el visitante eligió para rellenar el formulario
  const [request, setRequest] = useState(null);

  return (
    <div>
      <Home />
      <Proyectos />
      <Habilidades />
      <Curriculum />
      <Servicios onSelect={setRequest} />
      <Contacto request={request} />
    </div>
  );
}

export default App;