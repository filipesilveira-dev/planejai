// RootLayout.tsx

import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";


export function RootLayout(){
	return(
		<>
			<Header />
            {/* pega o conteúdo de router.js e substitui aqui (semelhante ao que um children faz) */}
			<Outlet />
</>
)
}
