import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationFormPage } from "./pages/SimulationFormPage";
import { SimulationResultsPage } from "./pages/SimulationResultsPage";
import { SimulationHistoryPage } from "./pages/SimulationHistoryPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,

    children: [
      {
        path: "/",
        element: <SimulationFormPage />,
      },
      // os ":" antes de "id" indicam ao react router que esta rota terá um parte dinâmica
      { path: "/resultado/:id", element: <SimulationResultsPage /> },
      { path: "/historico", element: <SimulationHistoryPage/> },
    ],
  },
]);
