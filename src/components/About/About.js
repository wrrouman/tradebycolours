import "./About.scss"



//Import Images
import FCX_daily from "../../assets/images/FCX_daily.png";
import FSLR_daily from "../../assets/images/FSLR_daily.png";
import META_4hr from "../../assets/images/META_4hr.png";
import NFLX_daily from "../../assets/images/NFLX_daily.png";
import NVDA_daily from "../../assets/images/NVDA_daily.png";
import QQQ_daily from "../../assets/images/QQQ_daily.png";
import TSLA_daily from "../../assets/images/TSLA_daily.png";
import TSLA_2hr from "../../assets/images/TSLA_2hr.png";



function About() {
  return (
    <>
      <h3>What is Trade By Colors</h3>
      <p>
        Trade By Colors helps retail traders and investors stay on the right
        side of market by highlting market Momentum using our technical
        indicators.
      </p>
      <img src={FCX_daily} alt="FCX" />
      <img src={FSLR_daily} alt="FCX" />
      <img src={NFLX_daily} alt="FCX" />
      <img src={NVDA_daily} alt="FCX" />
      <img src={QQQ_daily} alt="FCX" />
      <img src={TSLA_daily} alt="FCX" />
      <img src={META_4hr} alt="FCX" />
      <img src={TSLA_2hr} alt="FCX" />
     
    </>
  );
}

export default About;
