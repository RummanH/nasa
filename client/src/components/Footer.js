import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return (
    <ArwesFooter animate>
      <Centered>
        <Paragraph style={{ fontSize: 18, margin: "10px 0" }}>
          All right reserved by Mohammad Rumman. Designed by ZTM
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

export default Footer;
