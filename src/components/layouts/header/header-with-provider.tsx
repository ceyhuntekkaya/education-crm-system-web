import { HeaderProvider } from "./context";
import Header from "./header";

const HeaderWithProvider = () => {
  return (
    <HeaderProvider>
      <Header />
    </HeaderProvider>
  );
};

export default HeaderWithProvider;
