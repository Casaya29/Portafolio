import { useState } from "react";
import { SettingsProvider } from "./i18n/settings";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import Habilidades from "./pages/Habilidades";
import Curriculum from "./pages/Cv";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import Footer from "./component/Footer";
import "./App.css";

function App() {
  // Guarda el servicio que el visitante eligió para rellenar el formulario
  const [request, setRequest] = useState(null);

  return (
    <SettingsProvider>
      <div>
        <Home />
        <Proyectos />
        <Habilidades />
        <Curriculum />
        <Servicios onSelect={setRequest} />
        <Contacto request={request} />
        <Footer />
      </div>
    </SettingsProvider>
  );
}

export default App;
