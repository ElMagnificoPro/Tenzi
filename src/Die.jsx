import DieOne from "./assets/dice-one-svgrepo-com.svg";
import DieTwo from "./assets/dice-two-svgrepo-com.svg";
import DieThree from "./assets/dice-three-svgrepo-com.svg";
import DieFour from "./assets/dice-four-svgrepo-com.svg";
import DieFive from "./assets/dice-five-svgrepo-com.svg";
import DieSix from "./assets/dice-six-svgrepo-com.svg";

export default function Die(props) {
  function getDie(value) {
    switch (value) {
      case 1:
        return DieOne;
      case 2:
        return DieTwo;
      case 3:
        return DieThree;
      case 4:
        return DieFour;
      case 5:
        return DieFive;
      case 6:
        return DieSix;
      default:
        break;
    }
  }

  return (
    <div
      className={props.fixed ? "is-fixed die" : "die"}
      onClick={props.onClick}
      key={props.value}
    >
      <img src={getDie(props.value)} alt="die" />
    </div>
  );
}
