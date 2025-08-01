import { ReactNode } from "react";
import Header from "./header";

const StandardLayoutTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div id="parent">
        <div id="main">
          {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <div
            id="detail"
            // className={navigation.state === 'loading' ? 'loading' : ''}
            // className={`${sidebarOpen ? "adjusted-width" : "normal-width"}`}
          >
            {children}
          </div>
        </div>
      </div>
      <div id="footer"></div>
    </>
  );
};

export default StandardLayoutTemplate;
