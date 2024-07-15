function TabSelector({ tabValues, activeTab, setActiveTab }) {
  return (
    <div className={"tabs grid grid-cols-4 items-center bg-white dark:bg-gray-800 rounded-xl h-fit p-[4px]"}>
      {tabValues.map((tab) => (
        <span
          className={`tab text-black dark:text-gray-200 text-center cursor-pointer px-6 py-3 rounded-xl ${tab === activeTab && 'active'}`}
          onClick={() => setActiveTab(tab)}>
            {tab}
        </span>
      ))}
    </div>
  );
}

export default TabSelector;
