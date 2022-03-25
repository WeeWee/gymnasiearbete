import SettingsPage from "../../components/settings";
const notification = () => {
  return (
    <div className=" h-full grid grid-cols-5 md:grid-cols-4 w-screen overflow-hidden md:overflow-y-auto">
      <SettingsPage />
      <div className="h-full pt-16 w-auto col-start-3 col-span-3 md:col-start-2 md:col-span-3 text-left overflow-hidden">
        <h1 className="text-2xl pt-6">Nothing to see here..</h1>
      </div>
    </div>
  );
};

export default notification;
