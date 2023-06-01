import HeaderFrame from "@/components/HeaderFrame";
import ContextAPI from "@/context/ContextAPI";
import "@/styles/global.scss";

import 'react-lazy-load-image-component/src/effects/blur.css';


export default function App({ Component, pageProps }) {
	return (
		<ContextAPI>
      <HeaderFrame />
			<Component {...pageProps} />
		</ContextAPI>
	);
}
