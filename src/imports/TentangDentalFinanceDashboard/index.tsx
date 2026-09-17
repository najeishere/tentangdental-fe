import svgPaths from "./svg-oyrgrh1ok6";

function ChartColumnStacked() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chart-column-stacked">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="chart-column-stacked">
          <path d={svgPaths.pef45f30} id="Vector" stroke="white" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="bg-[#1cb5bd] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[36px]" data-name="Brand mark">
      <ChartColumnStacked />
    </div>
  );
}

function BrandName() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-name="Brand name">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#172126] text-[16px] w-full">DentalFinance</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#94a0a6] text-[10px] w-full">TENTANG DENTAL</p>
    </div>
  );
}

function Brand() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center overflow-clip relative shrink-0 w-full" data-name="Brand">
      <BrandMark />
      <BrandName />
    </div>
  );
}

function LayoutDashboard() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="layout-dashboard">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="layout-dashboard">
          <g id="Vector">
            <path d={svgPaths.p2f7c3ff0} stroke="#11858C" strokeLinecap="round" />
            <path d={svgPaths.p772e900} stroke="#11858C" strokeLinecap="round" />
            <path d={svgPaths.p99ad200} stroke="#11858C" strokeLinecap="round" />
            <path d={svgPaths.p3fc0d440} stroke="#11858C" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ActiveIndicator() {
  return <div className="bg-[#1cb5bd] h-[18px] relative rounded-[999px] shrink-0 w-[3px]" data-name="Active indicator" />;
}

function NavigationItem() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <LayoutDashboard />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-px not-italic relative text-[#11858c] text-[14px]">Dashboard</p>
      <ActiveIndicator />
    </div>
  );
}

function NavigationItems() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Navigation items">
      <NavigationItem />
    </div>
  );
}

function NavigationGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation group">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[10px] uppercase w-full">Overview</p>
      <NavigationItems />
    </div>
  );
}

function ArrowLeftRight() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="arrow-left-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="arrow-left-right">
          <path d={svgPaths.p227fbfb0} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem1() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <ArrowLeftRight />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Transactions</p>
    </div>
  );
}

function WalletMinimal() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="wallet-minimal">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="wallet-minimal">
          <path d={svgPaths.p33eb6300} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem2() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <WalletMinimal />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Income</p>
    </div>
  );
}

function Receipt() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="receipt">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="receipt">
          <path d={svgPaths.p326d5a40} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem3() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <Receipt />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Expenses</p>
    </div>
  );
}

function ChartPie() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="chart-pie">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="chart-pie">
          <path d={svgPaths.p3c2c66e0} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem4() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <ChartPie />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Profit Sharing</p>
    </div>
  );
}

function CheckSquare() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="check-square-2">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="check-square-2">
          <path d={svgPaths.p208bcd00} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem5() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <CheckSquare />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Reconciliation</p>
    </div>
  );
}

function NavigationItems1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation items">
      <NavigationItem1 />
      <NavigationItem2 />
      <NavigationItem3 />
      <NavigationItem4 />
      <NavigationItem5 />
    </div>
  );
}

function NavigationGroup1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation group">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[10px] uppercase w-full">Finance</p>
      <NavigationItems1 />
    </div>
  );
}

function BarChart() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="bar-chart">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="bar-chart">
          <path d={svgPaths.p3d000a80} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem6() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <BarChart />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Financial Reports</p>
    </div>
  );
}

function NavigationItems2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Navigation items">
      <NavigationItem6 />
    </div>
  );
}

function NavigationGroup2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation group">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[10px] uppercase w-full">Reports</p>
      <NavigationItems2 />
    </div>
  );
}

function Users() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="users">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="users">
          <path d={svgPaths.p4264400} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem7() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <Users />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Patients</p>
    </div>
  );
}

function Layers() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="layers">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="layers">
          <path d={svgPaths.p1ce9800} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem8() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <Layers />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Treatments</p>
    </div>
  );
}

function NavigationItems3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation items">
      <NavigationItem7 />
      <NavigationItem8 />
    </div>
  );
}

function NavigationGroup3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation group">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[10px] uppercase w-full">Data</p>
      <NavigationItems3 />
    </div>
  );
}

function Settings() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="settings">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="settings">
          <path d={svgPaths.p1f61bb80} id="Vector" stroke="#65737A" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function NavigationItem9() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[12px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Navigation item">
      <Settings />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-px not-italic relative text-[#65737a] text-[14px]">Settings</p>
    </div>
  );
}

function NavigationItems4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Navigation items">
      <NavigationItem9 />
    </div>
  );
}

function NavigationGroup4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Navigation group">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[10px] uppercase w-full">System</p>
      <NavigationItems4 />
    </div>
  );
}

function NavigationGroups() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px overflow-clip relative w-full" data-name="Navigation groups">
      <NavigationGroup />
      <NavigationGroup1 />
      <NavigationGroup2 />
      <NavigationGroup3 />
      <NavigationGroup4 />
    </div>
  );
}

function CircleQuestionMark() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="circle-question-mark">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_61)" id="circle-question-mark">
          <path d={svgPaths.p26423ac2} id="Vector" stroke="#1CB5BD" strokeLinecap="round" />
        </g>
        <defs>
          <clipPath id="clip0_0_61">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function HelpHeading() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="Help heading">
      <CircleQuestionMark />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-px not-italic relative text-[13px] text-white">Need help?</p>
    </div>
  );
}

function HelpCard() {
  return (
    <div className="bg-[#18353a] content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-name="Help card">
      <HelpHeading />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#b9c9cc] text-[12px] w-full">Visit the finance guide or contact our support team.</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1cb5bd] text-[12px] w-full">Open help center →</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#fbfcfc] h-[1100px] relative shrink-0 w-[248px]" data-name="Sidebar">
      <div className="content-stretch flex flex-col gap-[32px] items-start overflow-clip px-[16px] py-[24px] relative rounded-[inherit] size-full">
        <Brand />
        <NavigationGroups />
        <HelpCard />
      </div>
      <div aria-hidden className="absolute border-[#e5eaec] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PageHeading() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Page heading">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#172126] text-[22px]">Dashboard</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#65737a] text-[12px]">Ringkasan keuangan klinik</p>
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="calendar">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="calendar">
          <path d={svgPaths.p58fbb00} id="Vector" stroke="#65737A" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="chevron-down">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="#94A0A6" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function DateRange() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0" data-name="Date range">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[16px] relative rounded-[inherit] size-full">
        <Calendar />
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#172126] text-[13px] whitespace-nowrap">September 2026</p>
        <ChevronDown />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Search1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="search">
          <path d={svgPaths.p3f6e0f00} id="Vector" stroke="#65737A" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Shortcut() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0" data-name="Shortcut">
      <div className="content-stretch flex items-start overflow-clip px-[6px] py-[4px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[10px] whitespace-nowrap">⌘K</p>
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Search() {
  return (
    <div className="bg-[#f6f8f9] h-[40px] relative rounded-[8px] shrink-0 w-[220px]" data-name="Search">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative rounded-[inherit] size-full">
        <Search1 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#94a0a6] text-[13px]">Cari transaksi...</p>
        <Shortcut />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Notifications() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Notifications">
      <svg className="absolute block inset-0 size-full" fill="none" height="40" preserveAspectRatio="none" viewBox="0 0 40 40" width="40">
        <g id="Notifications">
          <rect fill="white" height="39" rx="7.5" width="39" x="0.5" y="0.5" />
          <rect height="39" rx="7.5" stroke="#E5EAEC" width="39" x="0.5" y="0.5" />
          <g id="bell">
            <path d={svgPaths.p50c1d00} id="Vector" stroke="#172126" strokeLinecap="round" strokeWidth="1.5" />
          </g>
          <circle cx="28.5" cy="11.5" fill="#B8786E" id="Unread indicator" r="2.5" stroke="white" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex items-center justify-center overflow-clip relative rounded-[999px] shrink-0 size-[36px]" data-name="Avatar">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#11858c] text-[13px] whitespace-nowrap">NA</p>
    </div>
  );
}

function UserDetails() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="User details">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#172126] text-[13px]">Nadia A.</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#65737a] text-[10px]">Finance Admin</p>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="chevron-down">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="#94A0A6" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center overflow-clip relative shrink-0" data-name="Profile">
      <Avatar />
      <UserDetails />
      <ChevronDown1 />
    </div>
  );
}

function HeaderControls() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0" data-name="Header controls">
      <DateRange />
      <Search />
      <Notifications />
      <Profile />
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Dashboard header">
      <div className="content-stretch flex items-center justify-between overflow-clip px-[32px] relative rounded-[inherit] size-full">
        <PageHeading />
        <HeaderControls />
      </div>
      <div aria-hidden className="absolute border-[#e5eaec] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ArrowUpRight() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="arrow-up-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g id="arrow-up-right">
          <path d={svgPaths.p1236bdc0} id="Vector" stroke="#1CB5BD" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TrendIndicator() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[32px]" data-name="Trend indicator">
      <ArrowUpRight />
    </div>
  );
}

function MetricHeader() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Metric header">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] whitespace-nowrap">Total Revenue</p>
      <TrendIndicator />
    </div>
  );
}

function ChartSpline() {
  return (
    <div className="h-[22px] relative shrink-0 w-[62px]" data-name="chart-spline">
      <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 62 22" width="62">
        <g id="chart-spline">
          <path d={svgPaths.p154d1260} id="Vector" stroke="#1CB5BD" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrendSummary() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end justify-between min-h-px overflow-clip relative w-full" data-name="Trend summary">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[12px] whitespace-nowrap">+12.4% vs previous month</p>
      <ChartSpline />
    </div>
  );
}

function KpiCard() {
  return (
    <div className="bg-white flex-[1_0_42px] h-[158px] min-w-px relative rounded-[12px]" data-name="KPI card">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <MetricHeader />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.15] not-italic relative shrink-0 text-[#172126] text-[27px] w-full">Rp 85.400.000</p>
        <TrendSummary />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function ArrowUpRight1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="arrow-up-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g id="arrow-up-right">
          <path d={svgPaths.p1236bdc0} id="Vector" stroke="#B8786E" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TrendIndicator1() {
  return (
    <div className="bg-[#f5ecea] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[32px]" data-name="Trend indicator">
      <ArrowUpRight1 />
    </div>
  );
}

function MetricHeader1() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Metric header">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] whitespace-nowrap">Total Expenses</p>
      <TrendIndicator1 />
    </div>
  );
}

function ChartSpline1() {
  return (
    <div className="h-[22px] relative shrink-0 w-[62px]" data-name="chart-spline">
      <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 62 22" width="62">
        <g id="chart-spline">
          <path d={svgPaths.p154d1260} id="Vector" stroke="#B8786E" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrendSummary1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end justify-between min-h-px overflow-clip relative w-full" data-name="Trend summary">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[12px] whitespace-nowrap">+4.8%</p>
      <ChartSpline1 />
    </div>
  );
}

function KpiCard1() {
  return (
    <div className="bg-white flex-[1_0_42px] h-[158px] min-w-px relative rounded-[12px]" data-name="KPI card">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <MetricHeader1 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.15] not-italic relative shrink-0 text-[#172126] text-[27px] w-full">Rp 32.000.000</p>
        <TrendSummary1 />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function ArrowUpRight2() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="arrow-up-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g id="arrow-up-right">
          <path d={svgPaths.p1236bdc0} id="Vector" stroke="#16815D" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TrendIndicator2() {
  return (
    <div className="bg-[#e9f7f1] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[32px]" data-name="Trend indicator">
      <ArrowUpRight2 />
    </div>
  );
}

function MetricHeader2() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Metric header">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] whitespace-nowrap">Net Profit</p>
      <TrendIndicator2 />
    </div>
  );
}

function ChartSpline2() {
  return (
    <div className="h-[22px] relative shrink-0 w-[62px]" data-name="chart-spline">
      <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 62 22" width="62">
        <g id="chart-spline">
          <path d={svgPaths.p154d1260} id="Vector" stroke="#16815D" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrendSummary2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end justify-between min-h-px overflow-clip relative w-full" data-name="Trend summary">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[12px] whitespace-nowrap">+18.2%</p>
      <ChartSpline2 />
    </div>
  );
}

function KpiCard2() {
  return (
    <div className="bg-white flex-[1_0_42px] h-[158px] min-w-px relative rounded-[12px]" data-name="KPI card">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <MetricHeader2 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.15] not-italic relative shrink-0 text-[#172126] text-[27px] w-full">Rp 53.400.000</p>
        <TrendSummary2 />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function ArrowUpRight3() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="arrow-up-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g id="arrow-up-right">
          <path d={svgPaths.p1236bdc0} id="Vector" stroke="#11858C" strokeLinecap="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function TrendIndicator3() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[32px]" data-name="Trend indicator">
      <ArrowUpRight3 />
    </div>
  );
}

function MetricHeader3() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Metric header">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] whitespace-nowrap">Cash Balance</p>
      <TrendIndicator3 />
    </div>
  );
}

function ChartLine() {
  return (
    <div className="h-[22px] relative shrink-0 w-[62px]" data-name="chart-line">
      <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 62 22" width="62">
        <g id="chart-line">
          <path d={svgPaths.p19243bc0} id="Vector" stroke="#11858C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TrendSummary3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end justify-between min-h-px overflow-clip relative w-full" data-name="Trend summary">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[12px] whitespace-nowrap">Current available balance</p>
      <ChartLine />
    </div>
  );
}

function KpiCard3() {
  return (
    <div className="bg-white flex-[1_0_42px] h-[158px] min-w-px relative rounded-[12px]" data-name="KPI card">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <MetricHeader3 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[1.15] not-italic relative shrink-0 text-[#172126] text-[27px] w-full">Rp 72.500.000</p>
        <TrendSummary3 />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function KpiOverview() {
  return (
    <div className="content-stretch flex gap-[16px] h-[158px] items-start relative shrink-0 w-full" data-name="KPI overview">
      <KpiCard />
      <KpiCard1 />
      <KpiCard2 />
      <KpiCard3 />
    </div>
  );
}

function ChartTitle() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Chart title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#172126] text-[16px]">Revenue vs Expenses</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#65737a] text-[12px]">Monthly performance · Apr–Sep 2026</p>
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Chart legend">
      <div className="relative shrink-0 size-[8px]" data-name="Marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
          <circle cx="4" cy="4" fill="#1CB5BD" id="Marker" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Revenue</p>
    </div>
  );
}

function ChartLegend1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Chart legend">
      <div className="relative shrink-0 size-[8px]" data-name="Marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
          <circle cx="4" cy="4" fill="#B8786E" id="Marker" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Expenses</p>
    </div>
  );
}

function ChartLegends() {
  return (
    <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0" data-name="Chart legends">
      <ChartLegend />
      <ChartLegend1 />
    </div>
  );
}

function ChartHeader() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Chart header">
      <ChartTitle />
      <ChartLegends />
    </div>
  );
}

function ValueAxis() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[204px] items-end justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[#94a0a6] text-[10px] w-[42px] whitespace-nowrap" data-name="Value axis">
      <p className="relative shrink-0">100M</p>
      <p className="relative shrink-0">75M</p>
      <p className="relative shrink-0">50M</p>
      <p className="relative shrink-0">25M</p>
      <p className="relative shrink-0">0</p>
    </div>
  );
}

function GridLines() {
  return (
    <div className="h-[196px] mb-[-196px] relative shrink-0 w-full" data-name="Grid lines">
      <svg className="absolute block inset-0 size-full" fill="none" height="196" preserveAspectRatio="none" viewBox="0 0 652 196" width="652">
        <g clipPath="url(#clip0_0_9)" id="Grid lines">
          <line id="Grid line" stroke="#E5EAEC" x2="652" y1="-0.5" y2="-0.5" />
          <line id="Grid line_2" stroke="#E5EAEC" x2="652" y1="48.5" y2="48.5" />
          <line id="Grid line_3" stroke="#E5EAEC" x2="652" y1="97.5" y2="97.5" />
          <line id="Grid line_4" stroke="#E5EAEC" x2="652" y1="146.5" y2="146.5" />
          <line id="Grid line_5" stroke="#E5EAEC" x2="652" y1="195.5" y2="195.5" />
        </g>
        <defs>
          <clipPath id="clip0_0_9">
            <rect fill="white" height="196" width="652" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Plot() {
  return (
    <div className="content-stretch flex gap-[8px] h-[196px] items-end justify-center overflow-clip relative shrink-0 w-full" data-name="Plot">
      <div className="bg-[#1cb5bd] h-[116px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Revenue bar" />
      <div className="bg-[#b8786e] h-[67px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Expense bar" />
    </div>
  );
}

function Month() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[228px] items-center min-w-px overflow-clip relative" data-name="Month">
      <Plot />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Apr</p>
    </div>
  );
}

function Plot1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[196px] items-end justify-center overflow-clip relative shrink-0 w-full" data-name="Plot">
      <div className="bg-[#1cb5bd] h-[132px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Revenue bar" />
      <div className="bg-[#b8786e] h-[73px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Expense bar" />
    </div>
  );
}

function Month1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[228px] items-center min-w-px overflow-clip relative" data-name="Month">
      <Plot1 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Mei</p>
    </div>
  );
}

function Plot2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[196px] items-end justify-center overflow-clip relative shrink-0 w-full" data-name="Plot">
      <div className="bg-[#1cb5bd] h-[126px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Revenue bar" />
      <div className="bg-[#b8786e] h-[78px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Expense bar" />
    </div>
  );
}

function Month2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[228px] items-center min-w-px overflow-clip relative" data-name="Month">
      <Plot2 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Jun</p>
    </div>
  );
}

function Plot3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[196px] items-end justify-center overflow-clip relative shrink-0 w-full" data-name="Plot">
      <div className="bg-[#1cb5bd] h-[151px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Revenue bar" />
      <div className="bg-[#b8786e] h-[70px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Expense bar" />
    </div>
  );
}

function Month3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[228px] items-center min-w-px overflow-clip relative" data-name="Month">
      <Plot3 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Jul</p>
    </div>
  );
}

function Plot4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[196px] items-end justify-center overflow-clip relative shrink-0 w-full" data-name="Plot">
      <div className="bg-[#1cb5bd] h-[165px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Revenue bar" />
      <div className="bg-[#b8786e] h-[82px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Expense bar" />
    </div>
  );
}

function Month4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[228px] items-center min-w-px overflow-clip relative" data-name="Month">
      <Plot4 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Agu</p>
    </div>
  );
}

function Plot5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[196px] items-end justify-center overflow-clip relative shrink-0 w-full" data-name="Plot">
      <div className="bg-[#1cb5bd] h-[184px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Revenue bar" />
      <div className="bg-[#b8786e] h-[76px] relative rounded-bl-[2px] rounded-br-[2px] rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-[18px]" data-name="Expense bar" />
    </div>
  );
}

function Month5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[228px] items-center min-w-px overflow-clip relative" data-name="Month">
      <Plot5 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">Sep</p>
    </div>
  );
}

function MonthlyBars() {
  return (
    <div className="content-stretch flex gap-[16px] h-[228px] items-end overflow-clip relative shrink-0 w-full" data-name="Monthly bars">
      <Month />
      <Month1 />
      <Month2 />
      <Month3 />
      <Month4 />
      <Month5 />
    </div>
  );
}

function PlotArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[244px] items-start min-w-px overflow-clip relative" data-name="Plot area">
      <GridLines />
      <MonthlyBars />
    </div>
  );
}

function ChartArea() {
  return (
    <div className="content-stretch flex gap-[12px] h-[244px] items-start overflow-clip relative shrink-0 w-full" data-name="Chart area">
      <ValueAxis />
      <PlotArea />
    </div>
  );
}

function RevenueAndExpenses() {
  return (
    <div className="bg-white flex-[1_0_50px] h-full min-w-px relative rounded-[12px]" data-name="Revenue and expenses">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative rounded-[inherit] size-full">
        <ChartHeader />
        <ChartArea />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function CompositionHeader() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-name="Composition header">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#172126] text-[16px]">Profit Composition</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#65737a] text-[12px]">September 2026 contribution</p>
    </div>
  );
}

function ProfitValue() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Profit value">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#65737a] text-[12px]">Net profit</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#172126] text-[22px]">Rp 53.400.000</p>
    </div>
  );
}

function ChangeBadge() {
  return (
    <div className="bg-[#e9f7f1] content-stretch flex flex-col items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Change badge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[12px] whitespace-nowrap">+18.2%</p>
    </div>
  );
}

function ProfitSummary() {
  return (
    <div className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full" data-name="Profit summary">
      <ProfitValue />
      <ChangeBadge />
    </div>
  );
}

function CategoryLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Category label">
      <div className="relative shrink-0 size-[8px]" data-name="Marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
          <circle cx="4" cy="4" fill="#1CB5BD" id="Marker" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#172126] text-[13px] whitespace-nowrap">General Dentistry</p>
    </div>
  );
}

function CategorySummary() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Category summary">
      <CategoryLabel />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">48%</p>
    </div>
  );
}

function CategoryBar() {
  return (
    <div className="bg-[#f6f8f9] content-stretch flex flex-col h-[7px] items-start overflow-clip relative rounded-[999px] shrink-0 w-full" data-name="Category bar">
      <div className="bg-[#1cb5bd] h-[7px] relative rounded-[999px] shrink-0 w-[142px]" data-name="Progress" />
    </div>
  );
}

function ProfitCategory() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Profit category">
      <CategorySummary />
      <CategoryBar />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[12px] whitespace-nowrap">Rp 25.6M</p>
    </div>
  );
}

function CategoryLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Category label">
      <div className="relative shrink-0 size-[8px]" data-name="Marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
          <circle cx="4" cy="4" fill="#B8786E" id="Marker" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#172126] text-[13px] whitespace-nowrap">Cosmetic Treatment</p>
    </div>
  );
}

function CategorySummary1() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Category summary">
      <CategoryLabel1 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">32%</p>
    </div>
  );
}

function CategoryBar1() {
  return (
    <div className="bg-[#f6f8f9] content-stretch flex flex-col h-[7px] items-start overflow-clip relative rounded-[999px] shrink-0 w-full" data-name="Category bar">
      <div className="bg-[#b8786e] h-[7px] relative rounded-[999px] shrink-0 w-[95px]" data-name="Progress" />
    </div>
  );
}

function ProfitCategory1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Profit category">
      <CategorySummary1 />
      <CategoryBar1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[12px] whitespace-nowrap">Rp 17.1M</p>
    </div>
  );
}

function CategoryLabel2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Category label">
      <div className="relative shrink-0 size-[8px]" data-name="Marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
          <circle cx="4" cy="4" fill="#11858C" id="Marker" r="4" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#172126] text-[13px] whitespace-nowrap">Other Services</p>
    </div>
  );
}

function CategorySummary2() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Category summary">
      <CategoryLabel2 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[12px] whitespace-nowrap">20%</p>
    </div>
  );
}

function CategoryBar2() {
  return (
    <div className="bg-[#f6f8f9] content-stretch flex flex-col h-[7px] items-start overflow-clip relative rounded-[999px] shrink-0 w-full" data-name="Category bar">
      <div className="bg-[#11858c] h-[7px] relative rounded-[999px] shrink-0 w-[59px]" data-name="Progress" />
    </div>
  );
}

function ProfitCategory2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Profit category">
      <CategorySummary2 />
      <CategoryBar2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a0a6] text-[12px] whitespace-nowrap">Rp 10.7M</p>
    </div>
  );
}

function CategoryBreakdown() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Category breakdown">
      <ProfitCategory />
      <ProfitCategory1 />
      <ProfitCategory2 />
    </div>
  );
}

function ProfitComposition() {
  return (
    <div className="bg-white h-full relative rounded-[12px] shrink-0 w-[350px]" data-name="Profit composition">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative rounded-[inherit] size-full">
        <CompositionHeader />
        <ProfitSummary />
        <div className="h-0 relative shrink-0 w-full" data-name="Divider">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 302 1" width="302">
              <line id="Divider" stroke="#E5EAEC" x2="302" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <CategoryBreakdown />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function FinancialAnalytics() {
  return (
    <div className="content-stretch flex gap-[24px] h-[390px] items-start relative shrink-0 w-full" data-name="Financial analytics">
      <RevenueAndExpenses />
      <ProfitComposition />
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Section title">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#172126] text-[16px]">Recent transactions</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#65737a] text-[12px]">Latest clinic cash movements</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="arrow-right">
          <path d={svgPaths.p278a3600} id="Vector" stroke="#65737A" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ViewTransactions() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="View transactions">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#172126] text-[13px] whitespace-nowrap">View all</p>
        <ArrowRight />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Section header">
      <SectionTitle />
      <ViewTransactions />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold h-[12px] leading-[normal] not-italic overflow-clip relative shrink-0 text-[#94a0a6] text-[10px] uppercase w-full whitespace-nowrap" data-name="Table header">
      <p className="absolute left-[44px] top-0">Transaction</p>
      <p className="absolute left-[314px] top-0">Date</p>
      <p className="absolute left-[418px] top-0">Category</p>
      <p className="-translate-x-full absolute left-[640px] text-right top-0">Amount</p>
      <p className="-translate-x-full absolute left-[748px] text-right top-0">Status</p>
    </div>
  );
}

function ArrowDownLeft() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-down-left">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="arrow-down-left">
          <path d={svgPaths.p3c1ee100} id="Vector" stroke="#11858C" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TransactionIcon() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[34px]" data-name="Transaction icon">
      <ArrowDownLeft />
    </div>
  );
}

function TransactionDescription() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-name="Transaction description">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#172126] text-[14px] w-full">Pembayaran perawatan</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#94a0a6] text-[12px] w-full">TRX-0928 · Nabila A.</p>
    </div>
  );
}

function TransactionIdentity() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[286px]" data-name="Transaction identity">
      <TransactionIcon />
      <TransactionDescription />
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="bg-[#e9f7f1] content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[999px] shrink-0" data-name="Status badge">
      <div className="relative shrink-0 size-[6px]" data-name="Status marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 6 6" width="6">
          <circle cx="3" cy="3" fill="#16815D" id="Status marker" r="3" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TransactionStatus() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-name="Transaction status">
      <StatusBadge />
    </div>
  );
}

function TransactionRow() {
  return (
    <div className="content-stretch flex h-[64px] items-center overflow-clip relative shrink-0 w-full" data-name="Transaction row">
      <TransactionIdentity />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] w-[105px]">09 Sep 2026</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] w-[132px]">Treatment income</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[14px] text-right w-[126px]">+Rp 4.250.000</p>
      <TransactionStatus />
    </div>
  );
}

function TransactionEntry() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Transaction entry">
      <TransactionRow />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 756 1" width="756">
            <line id="Divider" stroke="#E5EAEC" x2="756" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ArrowUpRight4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-up-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="arrow-up-right">
          <path d={svgPaths.p1908cf00} id="Vector" stroke="#B8786E" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TransactionIcon1() {
  return (
    <div className="bg-[#f5ecea] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[34px]" data-name="Transaction icon">
      <ArrowUpRight4 />
    </div>
  );
}

function TransactionDescription1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-name="Transaction description">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#172126] text-[14px] w-full">Pembelian dental supplies</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#94a0a6] text-[12px] w-full">TRX-0927 · PT Denta Jaya</p>
    </div>
  );
}

function TransactionIdentity1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[286px]" data-name="Transaction identity">
      <TransactionIcon1 />
      <TransactionDescription1 />
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="bg-[#e9f7f1] content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[999px] shrink-0" data-name="Status badge">
      <div className="relative shrink-0 size-[6px]" data-name="Status marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 6 6" width="6">
          <circle cx="3" cy="3" fill="#16815D" id="Status marker" r="3" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TransactionStatus1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-name="Transaction status">
      <StatusBadge1 />
    </div>
  );
}

function TransactionRow1() {
  return (
    <div className="content-stretch flex h-[64px] items-center overflow-clip relative shrink-0 w-full" data-name="Transaction row">
      <TransactionIdentity1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] w-[105px]">08 Sep 2026</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] w-[132px]">Clinic supplies</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#172126] text-[14px] text-right w-[126px]">−Rp 2.780.000</p>
      <TransactionStatus1 />
    </div>
  );
}

function TransactionEntry1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Transaction entry">
      <TransactionRow1 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 756 1" width="756">
            <line id="Divider" stroke="#E5EAEC" x2="756" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ArrowDownLeft1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-down-left">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="arrow-down-left">
          <path d={svgPaths.p3c1ee100} id="Vector" stroke="#11858C" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TransactionIcon2() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[34px]" data-name="Transaction icon">
      <ArrowDownLeft1 />
    </div>
  );
}

function TransactionDescription2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-name="Transaction description">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#172126] text-[14px] w-full">Pembayaran veneer</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#94a0a6] text-[12px] w-full">TRX-0926 · Reza P.</p>
    </div>
  );
}

function TransactionIdentity2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[286px]" data-name="Transaction identity">
      <TransactionIcon2 />
      <TransactionDescription2 />
    </div>
  );
}

function StatusBadge2() {
  return (
    <div className="bg-[#fff6dd] content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[999px] shrink-0" data-name="Status badge">
      <div className="relative shrink-0 size-[6px]" data-name="Status marker">
        <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 6 6" width="6">
          <circle cx="3" cy="3" fill="#B7791F" id="Status marker" r="3" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#b7791f] text-[12px] whitespace-nowrap">Pending</p>
    </div>
  );
}

function TransactionStatus2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-name="Transaction status">
      <StatusBadge2 />
    </div>
  );
}

function TransactionRow2() {
  return (
    <div className="content-stretch flex h-[64px] items-center overflow-clip relative shrink-0 w-full" data-name="Transaction row">
      <TransactionIdentity2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] w-[105px]">08 Sep 2026</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#65737a] text-[13px] w-[132px]">Treatment income</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16815d] text-[14px] text-right w-[126px]">+Rp 8.500.000</p>
      <TransactionStatus2 />
    </div>
  );
}

function TransactionEntry2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Transaction entry">
      <TransactionRow2 />
    </div>
  );
}

function TransactionList() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Transaction list">
      <TransactionEntry />
      <TransactionEntry1 />
      <TransactionEntry2 />
    </div>
  );
}

function RecentTransactions() {
  return (
    <div className="bg-white flex-[1_0_50px] h-full min-w-px relative rounded-[12px]" data-name="Recent transactions">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[inherit] size-full">
        <SectionHeader />
        <TableHeader />
        <div className="h-0 relative shrink-0 w-full" data-name="Divider">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 756 1" width="756">
              <line id="Divider" stroke="#E5EAEC" x2="756" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <TransactionList />
      </div>
      <div aria-hidden className="absolute border border-[#e5eaec] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)]" />
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="check-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip0_0_4)" id="check-circle">
          <path d={svgPaths.p2ce74680} id="Vector" stroke="#1CB5BD" strokeLinecap="round" strokeWidth="1.7" />
        </g>
        <defs>
          <clipPath id="clip0_0_4">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ReconciliationLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Reconciliation label">
      <CheckCircle />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Reconciliation</p>
    </div>
  );
}

function CurrentStatus() {
  return (
    <div className="bg-[#e8f8f8] content-stretch flex flex-col items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Current status">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#11858c] text-[10px] whitespace-nowrap">ON TRACK</p>
    </div>
  );
}

function ReconciliationHeader() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Reconciliation header">
      <ReconciliationLabel />
      <CurrentStatus />
    </div>
  );
}

function ReconciliationSummary() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-name="Reconciliation summary">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#afc3c6] text-[12px]">September 2026</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[27px] text-white">Rp 78.650.000</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#afc3c6] text-[12px]">98.7% of recorded transactions matched</p>
    </div>
  );
}

function ProgressValue() {
  return <div className="bg-[#1cb5bd] h-[7px] relative rounded-[999px] shrink-0 w-[241px]" data-name="Progress value" />;
}

function ProgressTrack() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col h-[7px] items-start overflow-clip relative rounded-[999px] shrink-0 w-full" data-name="Progress track">
      <ProgressValue />
    </div>
  );
}

function ReconciliationMetric() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative" data-name="Reconciliation metric">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[22px] text-white">124</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#afc3c6] text-[12px]">Matched</p>
    </div>
  );
}

function ReconciliationMetric1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative" data-name="Reconciliation metric">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#b8786e] text-[22px]">3</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#afc3c6] text-[12px]">Need review</p>
    </div>
  );
}

function ReconciliationMetrics() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-name="Reconciliation metrics">
      <ReconciliationMetric />
      <ReconciliationMetric1 />
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="arrow-right">
          <path d={svgPaths.p278a3600} id="Vector" stroke="#18353A" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ReviewReconciliation() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center justify-center overflow-clip py-[12px] relative rounded-[8px] shrink-0 w-full" data-name="Review reconciliation">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#18353a] text-[13px] whitespace-nowrap">Review reconciliation</p>
      <ArrowRight1 />
    </div>
  );
}

function ReconciliationStatus() {
  return (
    <div className="bg-[#18353a] content-stretch flex flex-col gap-[20px] h-full items-start overflow-clip p-[24px] relative rounded-[12px] shadow-[0px_4px_16px_0px_rgba(23,33,38,0.04)] shrink-0 w-[300px]" data-name="Reconciliation status">
      <ReconciliationHeader />
      <ReconciliationSummary />
      <ProgressTrack />
      <ReconciliationMetrics />
      <ReviewReconciliation />
    </div>
  );
}

function OperationsDetail() {
  return (
    <div className="content-stretch flex gap-[24px] h-[340px] items-start relative shrink-0 w-full" data-name="Operations detail">
      <RecentTransactions />
      <ReconciliationStatus />
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-name="Dashboard content">
      <KpiOverview />
      <FinancialAnalytics />
      <OperationsDetail />
    </div>
  );
}

function Workspace() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-[1024px] min-w-px overflow-clip relative" data-name="Workspace">
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
}

export default function TentangDentalFinanceDashboard() {
  return (
    <div className="bg-[#f6f8f9] content-stretch flex items-start relative size-full" data-name="Tentang Dental finance dashboard">
      <Sidebar />
      <Workspace />
    </div>
  );
}