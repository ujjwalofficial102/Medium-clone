import { Auth } from "../components/Auth";
import Quotes from "../components/Quotes";

const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div className="invisible md:visible">
        <Quotes />
      </div>
    </div>
  );
};

export default Signin;
