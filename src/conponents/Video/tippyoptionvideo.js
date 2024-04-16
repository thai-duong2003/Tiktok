import Menu from "../Menu";
import { faFlag, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TippyOptionvideo({ children, isright = false }) {
  const videomenu = [
    {
      icon: <FontAwesomeIcon icon={faHeartCrack} />,
      title: "Không quan tâm",
    },
    {
      icon: <FontAwesomeIcon icon={faFlag} />,
      title: "Báo cáo",
    },
  ];
  return (
    <div>
      <Menu isright={isright} items={videomenu}>
        {children}
      </Menu>
    </div>
  );
}
export default TippyOptionvideo;
