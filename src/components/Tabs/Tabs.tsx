import "./tabs.scss";
import { useState } from "react";
import { createContext, useContext } from "react";

type TabsProps = {
  children: React.ReactNode;
  className: string;
};

type ContextType = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TabsContext = createContext<ContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
});

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div
        className={`tabs-container ${className ? className : ""}`}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

type TabNavBarProps = {
  children: React.ReactNode;
};

export const TabNavBar = ({ children }: TabNavBarProps) => {
  return <div className="tab-nav-bar">{children}</div>;
};

type TabNavProps = {
  index: number;
  label: string;
};

export const TabNav = ({ index, label }: TabNavProps) => {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);

  const handleClick = () => {
    setActiveIndex(index);
  };
  return (
    <div
      className={`tab-nav ${activeIndex === index ? "active" : ""}`}
      onClick={handleClick}
    >
      <span>{label}</span>
    </div>
  );
};

type TabContentProps = {
  index: number;
  children: React.ReactNode;
};

export const TabContent = ({ index, children }: TabContentProps) => {
  const { activeIndex } = useContext(TabsContext);
  return (
    <div className={`tab-content ${activeIndex === index ? "active" : ""}`}>
      {children}
    </div>
  );
};
