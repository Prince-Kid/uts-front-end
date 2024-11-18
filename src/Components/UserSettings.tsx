import React, {
 ReactNode,
 useState,
 useCallback,
 Children,
 isValidElement,
} from "react";

interface TabProps {
 label?: string;
 tabName?: string;
 children: ReactNode;
}

interface SettingsProps {
 children: React.ReactElement<TabProps>[];
 className: string;
}

interface TabButtonProps {
 isActive: boolean;
 onClick: () => void;
 children: ReactNode;
}

const UserSettings: React.FC<SettingsProps> = ({ children, className }) => {
 const [activeTab, setActiveTab] = useState(children[0]?.props.label);
 const handleActiveTab = useCallback(setActiveTab, []);
 return (
  <section className={className}>
   <nav className='flex flex-row'>
    {Children.map(children, (child) => {
     if (isValidElement<TabProps>(child)) {
      return (
       <TabButton
        key={child.props.label}
        isActive={activeTab === child.props.label}
        onClick={() => handleActiveTab(child.props.label)}
       >
        {child.props.tabName}
       </TabButton>
      );
     }
     return null;
    })}
   </nav>
   <>
    {Children.toArray(children).find(
     (child) =>
      isValidElement<TabProps>(child) && child.props.label === activeTab
    )}
   </>
  </section>
 );
};
const TabButton: React.FC<TabButtonProps> = ({
 isActive,
 onClick,
 children,
}) => (
 <button
  className={`py-1 px-2 text-sm md:text-lg  sm:py-2 sm:px-3  font-outfit hover:bg-sky-50 transition-colors duration-500 ${
   isActive ? "border-b-2 border-third text-third" : "text-border"
  }`}
  onClick={onClick}
 >
  {children}
 </button>
);

export { UserSettings as default };
