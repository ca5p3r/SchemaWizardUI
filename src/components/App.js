import NavigationBar from "./NavigationBar";
import ConnectionForm from "./ConnectionForm";
import MyToast from "./MyToast";
import Loading from "./Loading";
import ComparisonArea from "./ComparisonArea";
import { useSelector } from "react-redux";

export default function App() {
  const isLoading = useSelector((state) => state.app.isLoading);
  return (
    <div className="App" id="app">
      {isLoading && <Loading />}
      <NavigationBar />
      <ConnectionForm />
      <ComparisonArea />
      <MyToast />
    </div>
  );
}
