import React from "react";
import { auth, database } from "./config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import "./pages/css/waiver.css";

const Waiver = () => {

  const handleAgreeWaiver = async () => {
    try {
      // Update the waiver field in user data to "signed"
      const userDocRef = doc(database, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, { waiver: true });

    } catch (error) {
      console.error("Error updating waiver:", error);
    }
  };

  return (
    <div className="waiver-container">
      <div className="waiver-header">
        <div className="text">Waiver form</div>
        <div className="underline"></div>
      </div>
      <form className="waiver-form">
        <p className="waiver-para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu semper
          ligula. Aenean vulputate ipsum quis egestas sollicitudin. Ut porta
          consectetur lectus id gravida. Mauris est ligula, fringilla sagittis
          ultricies eget, euismod vel ipsum. Pellentesque faucibus risus vitae
          erat elementum dictum. Integer vitae libero metus. Donec ut felis eu
          mi facilisis sodales. In eros nibh, interdum suscipit eros vitae,
          ultricies semper nulla. Nullam in lectus ac quam bibendum euismod ac
          ut urna. Ut tempus imperdiet elementum. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia curae; Aenean
          maximus nunc vitae diam vehicula commodo. Pellentesque ultrices libero
          eu laoreet hendrerit. Aliquam sem purus, laoreet et elementum eu,
          gravida eget purus. Morbi molestie lacinia massa, eget scelerisque
          nisl sagittis nec. Integer vestibulum rhoncus finibus. Mauris eu nisl
          condimentum, mollis dolor cursus, maximus lacus. In felis metus,
          rhoncus et malesuada cursus, lobortis et justo. Pellentesque et
          sodales justo. Vivamus ac lectus enim. Quisque tristique turpis nulla,
          eu consectetur ex luctus eu. Donec hendrerit felis arcu, vel porta
          libero scelerisque vitae. Vestibulum sit amet pharetra lacus.
          Vestibulum sed justo diam. Praesent vestibulum, justo a consectetur
          imperdiet, nisl felis gravida magna, et varius dolor est sed nibh.
          Integer elementum hendrerit nibh non fringilla. Pellentesque tempor
          mauris et sollicitudin porta. Nam sagittis, urna quis tempor faucibus,
          felis quam consequat lectus, sagittis scelerisque lectus nunc eu
          nulla. Mauris malesuada eleifend mi, ac convallis nisi venenatis et.
          Fusce et porttitor nibh. Quisque iaculis massa et enim viverra
          interdum. Vestibulum ac maximus magna. Proin sed semper ex, sed
          placerat purus. Phasellus dictum massa sit amet pulvinar molestie. Sed
          finibus ante at fermentum volutpat. In nisi magna, pulvinar eu mattis
          sit amet, imperdiet non mauris. Suspendisse potenti. Integer cursus
          orci lacus, vitae porttitor erat sodales id. Suspendisse sollicitudin
          vestibulum lorem nec consectetur. Fusce justo est, pretium vitae ante
          nec, condimentum placerat nisl. Sed a magna fringilla, pretium turpis
          non, vestibulum odio. Curabitur arcu elit, pharetra eu erat et,
          lobortis malesuada purus. Donec dapibus magna nisi, eu dapibus nulla
          vehicula ut. Suspendisse at tincidunt ante. Quisque sapien lacus,
          faucibus vel iaculis id, efficitur vel ex. In euismod blandit nunc id
          iaculis. Vestibulum auctor mi eget ex sollicitudin, sed ornare felis
          vehicula. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Nullam sed finibus diam, porttitor
          lobortis felis. Cras volutpat leo eu libero tincidunt imperdiet.
          Mauris accumsan velit et nisi eleifend, sit amet sagittis enim
          pretium. Fusce ac erat id tortor faucibus tempus. Donec luctus id
          tortor eu luctus. Praesent at urna nisi. Duis feugiat ante in massa
          dapibus finibus. Praesent quis est nisl. Nulla scelerisque urna dolor,
          non commodo nunc hendrerit sed. Aenean lorem felis, mattis vel enim
          vel, gravida pretium velit. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. In hac habitasse
          platea dictumst. In imperdiet, ante vel hendrerit ornare, lectus magna
          aliquet mauris, sit amet fringilla justo eros ac ante. Praesent vel
          lobortis mauris. Cras luctus velit arcu, ac fringilla turpis
          sollicitudin nec. Mauris eu laoreet lorem. Fusce dui tellus, efficitur
          at ipsum commodo, eleifend suscipit urna. Aenean bibendum risus velit,
          rutrum venenatis nunc tincidunt sed. Fusce suscipit, neque ut
          porttitor dictum, mi felis porta dolor, nec gravida mi dui et dui.
          Proin accumsan, justo nec viverra hendrerit, nibh mauris imperdiet
          nunc, sit amet rutrum nunc sem ut purus. Donec ultrices cursus nisl,
          sed aliquet urna sodales sit amet.
        </p>
        <div className="agree-btn-container">
          <button id="agree-btn" onClick={handleAgreeWaiver}>
            Agree
          </button>
        </div>
      </form>
    </div>
  );
};

export default Waiver;
