import {
  Facebookicon,
  Nhungicon,
  Sendicon,
  Whatappicon,
  Linkicon,
} from "../Icon/Icon";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export const shaerbloc = {
  data: [
    {
      icon: <Nhungicon />,
      title: "Nhúng",
    },
    {
      icon: <Sendicon />,
      title: "Gửi đến bạn bè",
    },
    {
      icon: <Facebookicon />,
      title: "Share to Facebook",
    },
    {
      icon: <Whatappicon />,
      title: "Share to WhatsApp",
    },
    {
      icon: <Linkicon />,
      title: "Sao chép liên kết",
    },
    {
      icon: <FontAwesomeIcon icon={faAngleDown} />,
    },
  ],
};

function Shareblock({ data, videodetaill = false }) {
  return (
    <>
      {shaerbloc.data.map((item, index) => {
        return (
          <Button Videobtnactive key={index} lefticon={item.icon}>
            {videodetaill === true ? "" : item.title}
          </Button>
        );
      })}
    </>
  );
}
export default Shareblock;
