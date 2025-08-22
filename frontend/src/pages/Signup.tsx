import { Auth } from "../components/Auth";
import Quotes from "../components/Quotes";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Auth type="signup" />
      </div>
      <div className="invisible md:visible">
        <Quotes />
      </div>
    </div>
  );
};

export default Signup;
