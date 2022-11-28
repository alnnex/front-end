import '../styles/globals.css'
import Navigations from "../components/Navigations"

function MyApp({ Component, pageProps }) {
  return  <div className="max-w-screen-2xl mx-auto relative">
  <Navigations /> <Component {...pageProps} />
</div>
}

export default MyApp
