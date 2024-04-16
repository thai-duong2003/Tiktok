import { faBan, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Baocaoicon } from "../Icon/Icon";
import Menu from "../Menu";

function Baocaoblock({ x, y }) {
  const array = [
    {
      icon: <Baocaoicon />,
      title: "Báo cáo",
    },
    {
      icon: <FontAwesomeIcon icon={faBan} />,
      title: "Chặn",
    },
  ];
  return (
    <Menu items={array} X={x} Y={y}>
      <span>
        <FontAwesomeIcon icon={faEllipsis} />
      </span>
    </Menu>
  );
}
export default Baocaoblock;
