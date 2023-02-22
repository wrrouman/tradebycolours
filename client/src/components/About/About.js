import "./About.scss";
import { useState, createContext } from "react";

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
      <div className="about">
        <div className="about-information">
          <div className="about_whatistbc">
            <h3>What is Trade By Colors</h3>
            <p>
              Trade By Colors is designed to help retail traders and investors
              easily identify the stocks and sectors in the market with the most
              momentum. Using our indicatoes, we help traders stay onthe right
              side of momentum to capture the big impulses and moves.
            </p>
            <h6>Freeport Long Signal</h6>
            <img src={FCX_daily} alt="FCX" />
            <h6>TSLA Short Signal</h6>
            <img src={TSLA_daily} alt="FCX" />
            <h6>NVDA long and hhort signal</h6>
            <img src={NVDA_daily} alt="FCX" />
          </div>
          <div className="about_method">
            <h3>Signal Method</h3>
            <p>
              Daily signals are calulated on the the closing price of each day.
              If the fast EMA has a higher value than the slow EMA, and the PPO
              is above one, a positive signal will be fired. If the Fast EMA has
              a lower value than the slow EMA, and the PPO is below 1, a negatve
              signal will be fired. If the PPO and the EMA's are not in
              alighnment, a neutral condional will be displayed.
            </p>
            <h6>Netflix Daily Momentum Signal </h6>
            <img src={NFLX_daily} alt="NFLX" />
            <p>
              The short term entry and exit signal are calculated with the same
              data every two hours to provide tactical entries and exits.
            </p>
            <h6>Tesla short term signal </h6>
            <img src={TSLA_2hr} alt="FCX" />
          </div>
          <div className="about_method">
            <h3>What data do we use?</h3>
            <p>
              Our system consists of three indicators, when aligned in such a
              way, they signal positiive, neutural, or negative momentum
            </p>
            <h5>Fast EMA</h5>
            <p>
              The 8 Period Exponential Moving Average - An exponential moving
              average is a type of moving average that places a greater weight
              and significance on the most recent data points.
            </p>
            <h5>Slow EMA </h5>
            <p>
              The 20 day moving average is an indicator that calculates the
              average price over the last 20 candles
            </p>
            <h5>PPO</h5>
            <p>
              The percentage price oscillator is a technical momentum indicator
              that shows the relationship between two moving averages in
              percentage terms. The PPO typically contains two lines: the PPO
              line, and the signal line. When the PPO is above zero that helps
              to indicate an uptrend, as the short-term EMA is above the
              longer-term EMA.
            </p>
            <h6>First Solar Long Signal</h6>
            <img src={FSLR_daily} alt="FCX" />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
