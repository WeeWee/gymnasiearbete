import SettingsPage from "../../components/settings";
import Circleloader from "../../components/circleloader";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Settings = () => {
  //https://dribbble.com/shots/15186840-Setting-page-example/attachments/6929311?mode=media
  const router = useRouter();
  useEffect(() => {
    router.push("/settings/account");
  }, []);
  return <Circleloader />;
};

export default Settings;
