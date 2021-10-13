import "./Login.css";
import { AuthClient } from "@dfinity/auth-client";

let authClient;
const init = async () => {
  authClient = await AuthClient.create();
};
init();

const iiUrl = "https://identity.ic0.app/";
const maxTimeToLive = 0;

const updateView = () => {
  const identity = authClient.getIdentity();
  console.log("login dfinity success! \n identity:\n", identity);
  console.log("principal:", identity.getPrincipal());
};

const loginHandle = async () => {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  if (!authClient) {
    console.log("con't create authClient obj");
    return;
  }
  console.log("login dfinity");
  if (BigInt(maxTimeToLive) > BigInt(0)) {
    authClient.login({
      identityProvider: iiUrl,
      maxTimeToLive: BigInt(maxTimeToLive),
      onSuccess: updateView,
    });
  } else {
    authClient.login({
      identityProvider: iiUrl,
      onSuccess: updateView,
    });
  }
};
function Login() {
  return (
    <div className="center-h" style={{ width: "400px" }}>
      <button className="mt-100" onClick={loginHandle}>
        login Dfinity with II(internet identity)
      </button>
    </div>
  );
}
export default Login;
