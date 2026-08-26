/* AI Benchmarking Exercise — shared data + behavior.
   All editable content (datasets, rubric, prompts, form URLs) lives here. */

const FORM_URLS = {
  evaluation: "",
  transcript: "",
};

/* Where Phase 1 assessments are submitted: the /exec URL of the Apps Script web
   app in tools/apps-script.gs. Empty until that's deployed, in which case the
   submit button reports it rather than failing silently. */
const SUBMIT_URL =
  "https://script.google.com/macros/s/AKfycbyQBMPFalkTvkZfMu6eD0WsI4MUP2NpMFmCZo6Hr62K67ibnq-5lJCgi3I0A5mu_J_-/exec";

/* Datasets offered in the Phase 1 picker, one flat alphabetical list.
   Sourced from the Data Index's checkup list; entries still being filled in have
   a title and sometimes a URL, and the Step One prompt simply omits the fields
   we don't hold yet. Adding `featured: true` to any entry splits the dropdown
   into "Featured" and "All datasets" — useful while metadata is uneven, and
   currently unused.
   Deliberately absent: the Data Index's own ratings and evidence for these
   datasets. That's the answer key, and it lives nowhere in this repo. */
const DATASETS = {
  nhis: {
    title: "National Health Interview Survey",
    org: "Centers for Disease Control and Prevention (NCHS)",
    url: "https://www.cdc.gov/nchs/nhis/index.html",
    description:
      "The National Health Interview Survey (NHIS) monitors the health of the U.S. " +
      "population by collecting and analyzing data on a broad range of health topics " +
      "for children and adults. Conducted by CDC's National Center for Health " +
      "Statistics, it is the nation's largest and oldest national health survey, " +
      "collecting data since 1957 from about 27,000 adults each year through " +
      "confidential, face-to-face interviews.",
  },
  ahs: {
    title: "American Housing Survey",
    org: "U.S. Census Bureau",
    url: "https://www.census.gov/programs-surveys/ahs.html",
    description:
      "The survey provides up-to-date information about the quality and cost of " +
      "housing in the United States and major metropolitan areas, including the " +
      "physical condition of homes and neighborhoods, the costs of financing and " +
      "maintaining homes, and the characteristics of residents. Planners, policy " +
      "makers, and community stakeholders use the AHS to assess housing needs.",
  },
  hifld: {
    title: "Homeland Infrastructure Foundation-Level Data (HIFLD) Open",
    org: "Department of Homeland Security",
    url: "https://www.dhs.gov/gmo/hifld",
    description:
      "The public-facing portal for the HIFLD program, providing geospatial data " +
      "and tools for planners, analysts, and others throughout the homeland " +
      "security enterprise, supporting missions including law enforcement, border " +
      "protection, emergency management, critical infrastructure protection, and " +
      "national operations and data fusion centers.",
  },
  /* 44 datasets from the Data Index checkup list (names and URLs only). */
  marts: {
    title: "Advance Monthly Sales for Retail and Food Services Survey (MARTS)",
    org: "U.S. Census Bureau",
    url: "",
    description:
      "The U.S. Census Bureau conducts the Advance Monthly Sales for Retail and Food Services Survey (MARTS) to produce early national estimates of total and month-to-month change in sales for retail and food service establishments located in the United States. A retail establishment is one that sells merchandise to the general public (final consumers). The estimates from MARTS are released approximately ten business days after the end of the reference month and are revised one month later by estimates from the Monthly Retail Trade and Food Services Survey (MRTS). Estimates are summarized by industry classification based on the North American Industry Classification System (NAICS).",
  },
  "agricultural-prices": {
    title: "Agricultural Prices",
    org: "USDA National Agricultural Statistics Service",
    url: "",
    description:
      "The USDA National Agricultural Statistics Service (NASS) monthly Agricultural Prices report provides essential data on prices received by farmers for crops and livestock, alongside prices paid for production inputs. It includes price indexes, feed ratios, and parity prices, which are used to measure the economic health of U.S. agriculture.",
  },
  acs: {
    title: "American Community Survey (ACS)",
    org: "U.S. Census Bureau",
    url: "https://census.gov/programs-surveys/acs",
    description:
      "The American Community Survey (ACS) is an ongoing nationwide survey conducted by the Census Bureau that collects vital information about the social, economic, housing, and demographic characteristics of our nation's population. Replacing the long form of the decennial census, the ACS is distributed to approximately 3.5 million addresses annually, providing detailed data throughout the year. Since 2005, it has generated estimates for areas with populations of 65,000 or more and, through 5-year accumulations, for smaller geographic areas such as census tracts and block groups. This data plays a crucial role in informing policy decisions and guiding the distribution of trillions of dollars in federal funds each year.",
  },
  atus: {
    title: "American Time Use Survey (ATUS)",
    org: "",
    url: "https://www.bls.gov/tus",
    description:
      "The American Time Use Survey (ATUS) provides nationally representative estimates of how, where, and with whom Americans spend their time, and is the only federal survey providing data on the full range of nonmarket activities. These activities include work, childcare, housework, watching television, volunteering, and socializing.",
  },
  abs: {
    title: "Annual Business Survey (ABS)",
    org: "",
    url: "",
    description:
      "The Annual Business Survey (ABS) measures business owner demographics, research and development (R&D), innovation, and other topics of interest among businesses in the United States. The Business Enterprise Research and Development (BERD) Survey was integrated into the ABS in 2025. The ABS is a joint statistical project between the National Center for Science and Engineering Statistics (NCSES) within the U.S. National Science Foundation (NSF) and the U.S. Census Bureau.",
  },
  aies: {
    title: "Annual Integrated Economic Survey (AIES)",
    org: "",
    url: "",
    description:
      "The Annual Integrated Economic Survey (AIES) replaced and integrated seven annual business surveys (Annual Retail Trade Survey, Annual Wholesale Survey, Service Annual Survey, Annual Survey of Manufactures, Annual Capital Expenditures Survey, Manufacturer's Unfilled Orders Survey , Report of Organization) into one survey. The AIES provides the most comprehensive national and subnational data on business revenues, expenses, payroll, and employment on an annual basis.",
  },
  bps: {
    title: "Building Permits Survey (BPS)",
    org: "",
    url: "",
    description:
      "The Building Permits Survey (BPS) provides national, state, and local statistics on new privately-owned residential construction. Data are available monthly, year-to-date, and annually at the national, state, CBSA (formerly MSA), county and place levels.",
  },
  "census-of-agriculture": {
    title: "Census of Agriculture",
    org: "",
    url: "https://nass.usda.gov/AgCensus",
    description:
      "The Census of Agriculture, conducted once every five years, looks at land use and ownership, producer characteristics, production practices, income, and expenditures. The Census of Agriculture is a complete count of U.S. farms and ranches and the people who operate them. Even small plots of land - whether rural or urban - count if $1,000 or more of agricultural products were produced and sold, or normally would have been sold, during the census year.",
  },
  cfs: {
    title: "Commodity Flow Survey (CFS)",
    org: "Bureau of Transportation Statistics (BTS), U.S. Department of Transportation, and the U.S. Census Bureau",
    url: "",
    description:
      "The Commodity Flow Survey (CFS) is a joint effort by the Bureau of Transportation Statistics (BTS), U.S. Department of Transportation, and the U.S. Census Bureau, U.S. Department of Commerce and is required by law. The survey, conducted every five years, is the primary source of national and state-level data on domestic freight shipments by American businesses. As a shipper-based survey, the CFS collects information on how U.S. establishments transport raw materials and finished goods; the types of commodities shipped by mode of transportation; the value, weight, origin, and destinations of shipments (including exports). The CFS does not include imports or shipments originating in any U.S. territories. Industry coverage includes: Mining, Manufacturing, Wholesale Trade, Select Retail and Services, and some auxiliary establishments (e.g., warehouses) of in-scope, multi-unit, and retail companies.",
  },
  "construction-spending": {
    title: "Construction Spending",
    org: "",
    url: "",
    description:
      "Provides monthly estimates of the total dollar value of construction work done in the U.S. The data is collected through the Value of Construction Put in Place Survey (VIP) and covers construction work done each month on new structures or improvements to existing structures for private and public sectors.",
  },
  "consumer-credit": {
    title: "Consumer Credit",
    org: "",
    url: "",
    description:
      'The G.19 Statistical Release, "Consumer Credit," reports outstanding credit extended to individuals for household, family, and other personal expenditures, excluding loans secured by real estate. Total consumer credit comprises two major types: revolving and nonrevolving. The G.19 also reports selected terms of credit, including interest rates on new car loans, personal loans, and credit card plans at commercial banks. The G.19 also includes series that measure the terms of credit for new motor vehicle loans at finance companies.',
  },
  cpi: {
    title: "Consumer Price Index (CPI)",
    org: "",
    url: "https://bls.gov/cpi",
    description:
      "The Consumer Price Index (CPI) is a measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. Indexes are available for the U.S. and various geographic areas. Average price data for select utility, automotive fuel, and food items are also available.",
  },
  "crop-production": {
    title: "Crop Production",
    org: "",
    url: "",
    description:
      "The USDA Crop Production report, released monthly by the National Agricultural Statistics Service (NASS), provides official estimates on U.S. agricultural acreage, yield, and production for major field crops, fruits, and nuts.",
  },
  ces: {
    title: "Current Employment Statistics (CES)",
    org: "",
    url: "https://bls.gov/ces",
    description:
      "The Current Employment Statistics (CES) program is a monthly survey conducted by the Bureau of Labor Statistics. The survey provides employment, hours, and earnings estimates based on payroll records of business establishments.",
  },
  "economic-census": {
    title: "Economic Census",
    org: "",
    url: "",
    description:
      "The Economic Census is the official five-year measure of businesses in the United States providing comprehensive statistics at the national, state, and local levels. It serves as the benchmark for current economic activity, such as the Gross Domestic Product and Producer Price Index.",
  },
  fevs: {
    title: "Federal Employment Viewpoint Survey (FEVS)",
    org: "",
    url: "https://opm.gov/fevs",
    description:
      "The Office of Personnel Management Federal Employee Viewpoint Survey (OPM FEVS) is an organizational climate survey and assesses how employees jointly experience the policies, practices, and procedures characteristic of their agency and its leadership. Results from the OPM FEVS offers insights into whether, and to what extent, workplace conditions characterizing successful organizations are present in Federal agencies, information important to successful organizational change and development initiatives.",
  },
  "grain-stocks": {
    title: "Grain Stocks",
    org: "",
    url: "",
    description:
      "Issued four times yearly, contains stocks of all wheat, durum wheat, corn, sorghum, oats, barley, soybeans, flaxseed, canola, rapeseed, rye, sunflower, safflower, mustard seed, by States and U.S. and by position (on-farm or off-farm storage); includes number and capacity of off-farm storage facilities and capacity of on-farm storage facilities. The data is obtained via an off and on-farm stocks survey, the on-farm survey is a probability survey of farm operators, the off-farm stocks survey is enumerates the volume of grain in all known commercial grain storage facilities.",
  },
  htops: {
    title: "Household Trends and Outlook Pulse Survey (HTOPS)",
    org: "",
    url: "https://census.gov/programs-surveys/htops.html",
    description:
      "The Household Trends and Outlook Pulse Survey (HTOPS) is a national survey panel by the U.S. Census Bureau (Census). The purpose of the panel is to collect information on topics such as food and nutrition, transportation, employment, and education and to gather data that can be used to improve and inform future surveys. The panel will consist of individuals and households living across the U.S. who have agreed to be contacted and invited to participate in surveys.",
  },
  "housing-vacancies-and-homeownership": {
    title: "Housing Vacancies and Homeownership",
    org: "",
    url: "",
    description:
      "The Housing Vacancies and Homeownership provides current information on the rental and homeowner vacancy rates, and characteristics of units available for occupancy. Data is gathered from the Housing Vacancy Survey (HVS) in conjunction with the Current Population Survey (CPS).",
  },
  "industrial-production-and-capacity-utilization": {
    title: "Industrial Production and Capacity Utilization",
    org: "",
    url: "",
    description:
      "The Federal Reserve's monthly G.17 release measures the real output (Industrial Production) and utilization of infrastructure (Capacity Utilization) for U.S. manufacturing, mining, and utilities. It has been designated by the federal government as a Principal Federal Economic Indicator. Utilization rates from the Quarterly Survey of Plant Capacity Utilization (QPC) are a principal source for the measures of capacity and capacity utilization.",
  },
  liheap: {
    title: "Low Income Home Energy Assistance Program (LIHEAP)",
    org: "",
    url: "",
    description:
      "The Low Income Home Energy Assistance Program (LIHEAP), managed by the Administration for Children and Families (ACF), helps keep families safe and healthy through initiatives that assist families with energy costs. The LIHEAP compiles national- and state-level program data reported by grant recipients and tracks information on the funding, usage, and effectiveness of federal block grants that help low-income households cover home heating and cooling costs. It provides comprehensive statistics on home energy assistance, household demographics, and the performance measures of grant recipients.",
  },
  mhs: {
    title: "Manufactured Housing Survey (MHS)",
    org: "",
    url: "",
    description:
      "The Manufactured Housing Survey (MHS) is sponsored by the Department of Housing and Urban Development (HUD) and conducted by the U.S. Census Bureau. The MHS produces monthly regional estimates of the average sales price for new manufactured homes and more detailed annual estimates including selected characteristics of new manufactured homes. In addition, MHS produces monthly estimates of homes shipped by status. The statistics on shipments of new manufactured homes are produced by the Institute for Building Technology and Safety (IBTS). They are rounded in the month of release and unrounded in subsequent months. Both not seasonally adjusted and seasonally adjusted annual rates of shipment estimates of new manufactured homes are released monthly.",
  },
  m3: {
    title: "Manufacturers' Shipments, Inventories, and Orders (M3)",
    org: "",
    url: "",
    description:
      "The Manufacturers' Shipments, Inventories, and Orders (M3) survey provides broad-based, monthly statistical data on economic conditions in the domestic manufacturing sector. The survey measures current industrial activity and provides an indication of future business trends.",
  },
  meps: {
    title: "Medical Expenditure Panel Survey (MEPS)",
    org: "",
    url: "https://meps.ahrq.gov/mepsweb",
    description:
      "The Medical Expenditure Panel Survey, which began in 1996, is a set of large-scale surveys of families and individuals, their medical providers (doctors, hospitals, pharmacies, etc.), and employers across the United States. MEPS collects data on the specific health services that Americans use, how frequently they use them, the cost of these services, and how they are paid for, as well as data on the cost, scope, and breadth of health insurance held by and available to U.S. workers.",
  },
  mcbs: {
    title: "Medicare Current Beneficiary Survey (MCBS)",
    org: "",
    url: "https://cms.gov/data-research/research/medicare-current-beneficiary-survey",
    description:
      "The Medicare Current Beneficiary Survey (MCBS) has collected data since 1991 on Medicare beneficiaries' social and medical risk factors and the relationship between these factors, healthcare utilization, and health outcomes – at a point in time and over time - directly from beneficiaries. These data, linked with Medicare enrollment data and claims, provide information not otherwise available through administrative data on the Medicare program and can be used to evaluate effectiveness of health care policy and policy interventions.",
  },
  "monthly-wholesale-trade": {
    title: "Monthly Wholesale Trade",
    org: "",
    url: "",
    description:
      "The Monthly Wholesale Trade report provides national estimates of monthly sales, inventories, and inventories-to-sales ratios by kind of business for wholesale firms located in the United States (excluding manufacturers' sales branches and offices). Data from this survey provide business leaders and policymakers with an up-to-date picture of the nation's economic condition, and are a key element in estimating the quarterly Gross Domestic Product (GDP).",
  },
  "nass-peanut-prices": {
    title: "NASS Peanut Prices",
    org: "",
    url: "https://usda.library.cornell.edu/concern/publications/5t34sj58c",
    description:
      "This report is published weekly on Friday and includes the U.S. average price and marketings by type of peanut (Runner, Spanish, Valencia, and Virginia). The report also highlights averages and changes in peanut pricing for the week for farmer stock peanuts and runner-type peanuts. Data for this report is obtained from the first buyers of farmer stock peanuts.",
  },
  naep: {
    title: "National Assessment of Educational Progress (NAEP)",
    org: "",
    url: "https://nces.ed.gov/nationsreportcard",
    description:
      "The National Assessment of Educational Progress (NAEP), also known as The Nation's Report Card, is the largest ongoing, nationally representative assessment of education in the United States. Since 1969, NAEP has served as a vital measure of student achievement, providing valuable insights into academic performance and learning experiences across various subjects. Its results offer a comprehensive view of educational progress at the national level, across states, and in 27 urban districts.",
  },
  ncs: {
    title: "National Compensation Survey (NCS)",
    org: "",
    url: "",
    description:
      "The National Compensation Survey (NCS) is conducted by the U.S. Bureau of Labor Statistics to collect data on wages and benefits for America's workforce. Data gathered through the NCS is used to generate the Employment Cost Index (ECI), Employer Costs for Employee Compensation (ECEC), Employee Benefits, and Modeled Wage Estimates (MWE).",
  },
  ncvs: {
    title: "National Crime Victimization Survey (NCVS)",
    org: "",
    url: "https://bjs.ojp.gov/data-collection/ncvs",
    description:
      "The National Crime Victimization Survey (NCVS) is the nation's primary source of information on criminal victimization. Each year, data are obtained from a nationally representative sample of about 240,000 persons in about 150,000 households. Persons are interviewed on the frequency, characteristics, and consequences of criminal victimization in the United States.",
  },
  nsch: {
    title: "National Survey of Children's Health (NSCH)",
    org: "",
    url: "https://census.gov/programs-surveys/nsch.html",
    description:
      "The National Survey of Children's Health is a household survey that produces national and state-level data on the physical and emotional health of children 0 - 17 years old in the United States. The survey collects information related to the health and well-being of children, including access to and use of health care, family interactions, parental health, school and after-school experiences, and neighborhood characteristics.",
  },
  ppi: {
    title: "Producer Price Index (PPI)",
    org: "",
    url: "",
    description:
      "The Producer Price Index (PPI) program measures the average change over time in the selling prices received by domestic producers for their output. The prices included in the PPI are from the first commercial transaction for many products and some services.",
  },
  qfr: {
    title: "Quarterly Financial Report (QFR)",
    org: "",
    url: "",
    description:
      "The Quarterly Financial Report (QFR) program collects and publishes quarterly aggregate statistics on the financial results and position of U.S. corporations. The program currently collects and publishes financial data for the manufacturing, mining, wholesale trade, retail trade, information, and professional and technical services (except legal) sectors. The survey is a principal economic indicator that provides financial data essential to calculation of key U.S. government measures of national economic performance. Several U.S. Census Bureau reports, including Corporate Profits, Retail Trade, and Manufacturing, Mining, and Wholesale Trade, are produced using these data.",
  },
  qtax: {
    title: "Quarterly Summary of State and Local Tax Revenue (QTAX)",
    org: "",
    url: "",
    description:
      "The Quarterly Summary of State and Local Government Tax Revenue provides quarterly estimates of state and local government tax revenue at a national level, as well as detailed tax revenue data for individual states. The U.S. Congress, federal agencies, state and local governments, educational and research organizations, and the general public utilize these data for the following purposes: development of gross domestic product estimates, development of the national income and product accounts, and tax policy research.",
  },
  qspp: {
    title: "Quarterly Survey of Public Pensions (QSPP)",
    org: "",
    url: "",
    description:
      "The Quarterly Summary of Public Pensions is a quarterly panel survey that provides national summary data on the revenues, expenditures, and composition of assets of the largest defined benefit public employee pension systems for state and local governments. Data are collected on the financial holdings and activities of the largest public-employee pension systems. The financial holdings data show assets in various types of securities such as stocks, bonds, federal notes, and mortgages. Revenue data consist of earnings, as well as contributions from governments and employees. Expenditure data consist primarily of payments to beneficiaries and withdrawals.",
  },
  rhfs: {
    title: "Rental Housing Finance Survey (RHFS)",
    org: "",
    url: "",
    description:
      "The Rental Housing Finance Survey (RHFS) provides a current and continuous measure of financial, mortgage, and property characteristics of rental housing properties in the United States. The survey focuses on the financing of rental housing properties, with emphasis on new mortgages, refinanced mortgages, or similar devices such as deeds of trust or land contracts, and the characteristics of debt originations. RHFS included single-family residential and multifamily residential properties with at least one housing unit intended for rent.",
  },
  soc: {
    title: "Survey of Construction (SOC)",
    org: "",
    url: "",
    description:
      "The Survey of Construction (SOC) provides national and regional statistics on starts and completions of new single-family and multifamily housing units and statistics on sales of new single-family houses in the United States. The SOC also provides statistics on characteristics of new privately-owned residential structures in the United States. Data included are various characteristics of new single-family houses completed, new multifamily housing completed, new single-family houses sold, and new contractor-built houses started. The Department of Housing and Urban Development (HUD) partially funds this survey.",
  },
  scf: {
    title: "Survey of Consumer Finances (SCF)",
    org: "",
    url: "",
    description:
      "The Survey of Consumer Finances (SCF) is normally a triennial cross-sectional survey of U.S. families. The survey data include information on families’ balance sheets, pensions, income, and demographic characteristics. Information is also included from related surveys of pension providers and the earlier such surveys conducted by the Federal Reserve Board. No other study for the country collects comparable information. Data from the SCF are widely used, from analysis at the Federal Reserve and other branches of government to scholarly work at the major economic research centers.",
  },
  sipp: {
    title: "Survey of Income and Program Participation (SIPP)",
    org: "",
    url: "https://census.gov/programs-surveys/sipp.html",
    description:
      "The Survey of Income and Program Participation (SIPP) is a nationally representative longitudinal survey that provides comprehensive information on the dynamics of income, employment, household composition, and government program participation. SIPP is also a leading source of data on economic well-being, family dynamics, education, wealth, health insurance, child care, and food security. The survey interviews individuals for several years and provides monthly data about changes in household and family composition and economic circumstances over time.",
  },
  soma: {
    title: "Survey of Market Absorption of New Multifamily Units (SOMA)",
    org: "",
    url: "",
    description:
      "The Survey of Market Absorption of New Multifamily Units (SOMA) collects data for new residential construction. The SOMA reports provide information on amenities, rent/sales price levels, number of units, type of building, and the number of units taken off the market (absorbed). The data are collected at quarterly intervals until 12 months expire or until the units in a building are completely absorbed, which may occur sooner.",
  },
  "u-s-import-and-export-price-indices": {
    title: "U.S. Import and Export Price Indices",
    org: "",
    url: "",
    description:
      "The Department of Labor International Price Program produces Import/Export Price Indexes (MXP) containing data on changes in the prices of nonmilitary goods and services traded between the U.S. and the rest of the world.",
  },
  "us-international-trade-in-goods-and-services": {
    title: "US International Trade in Goods and Services",
    org: "",
    url: "",
    description:
      "The U.S. International Trade in Goods and Services program is a monthly release providing comprehensive data on U.S. trade balance, exports, and imports. It covers physical goods and services, measuring international transactions.",
  },
  "usaspending-gov": {
    title: "USAspending.gov",
    org: "",
    url: "https://usaspending.gov/",
    description:
      "USAspending.gov is the official source for spending data for the U.S. Government. Its mission is to show the American public what the federal government spends every year and how it spends the money. You can follow the money from the Congressional appropriations to the federal agencies and down to local communities and businesses.",
  },
  wngsr: {
    title: "Weekly Natural Gas Storage Report (WNGSR)",
    org: "",
    url: "",
    description:
      "The Weekly Natural Gas Storage Report is the U.S. government’s only Principal Federal Economic Indicator that provides weekly data; other indicators report either monthly or quarterly data. WNGSR reports the underground working natural gas storage level as of the previous Friday, weekly net change, comparisons to historical levels and net changes, and statistical measures for each of five regions in the Lower 48 states.",
  },

  custom: {
    title: "",
    org: "",
    url: "",
    description: "",
    custom: true,
  },
};

const TRIADS = {
  a: {
    label:
      "Triad A — Historical Data Availability · Staffing and Funding · Policy",
    categories: ["historical", "staffing", "policy"],
  },
  b: {
    label:
      "Triad B — Future Data Availability · Data Quality · Statutory Context",
    categories: ["future", "quality", "statutory"],
  },
  all: {
    label: "All six categories (only if time allows)",
    categories: [
      "historical",
      "staffing",
      "policy",
      "future",
      "quality",
      "statutory",
    ],
  },
};

/* Display order for the full rubric and the solo category picker. */
const CATEGORY_ORDER = [
  "historical",
  "future",
  "quality",
  "statutory",
  "staffing",
  "policy",
];

/* ---------- Background agent results ----------
   The rubric values the background agent reached, keyed by dataset then category.
   These are the agent's side of the comparison on results.html: hardcoded output
   from a run we control, not anything a participant types in.

   THESE ARE MOCK VALUES. Flip AGENT_RESULTS_ARE_MOCK to false once the real run
   replaces them — it drives a placeholder warning on the results page, so the
   numbers are never read as real while the flag is true. `evidence` is optional;
   the real run logs its reasoning, so fill it in when it exists. */

const AGENT_RESULTS_ARE_MOCK = true;

const AGENT_RESULTS = {
  nhis: {
    historical: { level: "Moderate Risk" },
    future: { level: "High Risk" },
    quality: { level: "Moderate Risk" },
    statutory: { level: "No Known Issue" },
    staffing: { level: "High Risk" },
    policy: { level: "Moderate Risk" },
  },
  ahs: {
    historical: { level: "No Known Issue" },
    future: { level: "Moderate Risk" },
    quality: { level: "Moderate Risk" },
    statutory: { level: "Moderate Risk" },
    staffing: { level: "Moderate Risk" },
    policy: { level: "No Known Issue" },
  },
  hifld: {
    historical: { level: "High Risk" },
    future: { level: "High Risk" },
    quality: { level: "Moderate Risk" },
    statutory: { level: "High Risk" },
    staffing: { level: "Moderate Risk" },
    policy: { level: "High Risk" },
  },
};

/* A dataset with no run yet reads as empty rather than as agreement. */
function agentResult(s, k) {
  const key = s.dataset || "nhis";
  return (AGENT_RESULTS[key] || {})[k] || {};
}
function hasAgentRun(s) {
  return !!AGENT_RESULTS[s.dataset || "nhis"];
}

/* Rubric text. Wording merged from the Assessment Rubric slide and
   AI Prompting 2.0 (which carries the more precise phrasing). */
const RUBRIC = {
  historical: {
    name: "Historical Data Availability",
    levels: {
      Gone: "Data files prior to the current year or cycle are no longer publicly available.",
      "High Risk":
        "Some data files prior to the current year or cycle are removed.",
      "Moderate Risk":
        "Some data elements that exist in the dataset prior to the current year or cycle are removed.",
      "No Known Issue":
        "Data prior to the current year or cycle remain accessible with no known alterations.",
    },
  },
  future: {
    name: "Future Data Availability",
    levels: {
      Gone: "Data collection and publication has been terminated.",
      "High Risk":
        "Statutory publication deadline missed and/or collection or publication skipped and/or ICR expired for more than one year.",
      "Moderate Risk":
        "Typical or intended publication date missed and/or collection or publication delayed; ICR expired up to one year.",
      "No Known Issue":
        "Data published on time or as expected and ICR active or renewed before expiration.",
    },
  },
  quality: {
    name: "Data Quality",
    levels: {
      Gone: "Data collection and publication has been terminated.",
      "High Risk": "Reductions in granularity, timeliness, or frequency.",
      "Moderate Risk":
        "Potential or emerging risk to granularity, timeliness, or frequency.",
      "No Known Issue":
        "Maintained or improved granularity, timeliness, or frequency.",
    },
  },
  statutory: {
    name: "Statutory Context",
    levels: {
      Gone: "N/A",
      "High Risk":
        "Statutory authorization is vague and/or there are alternative data collections that could serve as substitutes and/or no known programmatic use.",
      "Moderate Risk":
        "Not explicitly required by statute but required for the implementation of a state or federal program, and there are no alternative data collections that could serve as substitutes.",
      "No Known Issue":
        "Statutorily required and/or statutory authorization is explicitly named and it is clear what has to be collected, and there aren't alternative data collections that could serve as substitutes and/or required for implementation of a federal program.",
    },
  },
  staffing: {
    name: "Staffing and Funding",
    levels: {
      Gone: "All of the staff in the division or agency are gone and/or all funding has been terminated.",
      "High Risk":
        "40% or more of staff lost, and/or 1,000 or more staff lost, and/or budget cut by 20% or more, and/or leadership removed.",
      "Moderate Risk":
        "10–39% of staff lost, and/or 500–999 staff lost, and/or budget cut by 10–19%, and/or threatened change in leadership.",
      "No Known Issue":
        "Less than 10% of staff lost and less than 10% of budget cut and no known change in leadership.",
    },
  },
  policy: {
    name: "Policy",
    levels: {
      Gone: "Data collection and publication has been terminated.",
      "High Risk":
        "Presidential Action-driven information collection request (ICR); negative policy note on site; other significant changes in accordance with Administration priorities.",
      "Moderate Risk":
        "Proposed or pending changes; statements by administration officials suggesting a change is being considered or planned.",
      "No Known Issue":
        "No notable changes since January 2025 affecting what data is collected and published.",
    },
  },
};

/* ---------- Prompt templates (Phase 2) ---------- */

/* Only the metadata we actually hold goes into the prompt. Most of the picker's
   datasets are a name and a link, and asking the agent to establish the rest is
   the first thing this prompt does anyway — an "Organization: FILL IN" line
   would just be noise the agent has to reason around. */
function stepOnePrompt(d) {
  const known = [
    ["Dataset title", d.title],
    ["Organization/publisher", d.org],
    ["Description", d.description],
    ["URL", d.url],
  ]
    .filter(([, v]) => v && String(v).trim())
    .map(([label, v]) => `${label}: ${v}`)
    .join("\n");

  return `#data research
I am researching a federal dataset. Find out everything you can about this dataset, such as who publishes it, under what authority or mandate, its history, its typical users, and its benefits to the public. Be sure your research comprehensively covers each of those perspectives, as well as any others that you discover or seem useful. I believe this is accurate information, but please check:

${known || "Dataset title: FILL IN"}

Return a complete report on everything that a preservationist, data librarian, data scientist, or policy activist might want to know about this data.`;
}

/* Per decision D5, the in-person "Sources for context" URL list is dropped. */
function stepTwoPrompt(categoryKeys) {
  const rubricText = categoryKeys
    .map((k) => {
      const c = RUBRIC[k];
      const lines = Object.entries(c.levels)
        .map(([lvl, txt]) => `- ${lvl}: ${txt}`)
        .join("\n");
      return `### ${c.name}\n${lines}`;
    })
    .join("\n\n");

  const summary = categoryKeys
    .map((k) => `${RUBRIC[k].name}: <level>`)
    .join("\n");

  return `# Dataset risk assessment
I would like your help in assessing the likelihood that this data will be changed or removed from its primary location, and that users will no longer be able to access accurate and reliable copies of it, based on the rubric below.

## Sources for context
To help assess the rubric categories, perform additional research on the data, the agency, the data's topics and typical users, covering topics such as proposed regulatory or funding changes, recent news, and political commentary.

## Rubric
This rubric is divided up into categories. Each category is divided up into risk levels. In your output, please select the appropriate risk level for each category based on your research.

${rubricText}

For each category, concisely list the evidence and supporting sources that would support each risk level. Then indicate which risk level you find most appropriate and why.

Conclude with a simple summary of risk levels:
${summary}`;
}

/* Closing prompt. We ask the agent to describe itself rather than asking the
   participant which model and version they used — self-report from the agent is
   both more precise and one less thing to remember. */
function sessionMetaPrompt() {
  return `Emit a session_metadata YAML block reporting: current date, model identifier, knowledge cutoff, surface, whether memory is enabled, whether custom preferences or styles are active, all tools and MCP servers available, which tools were actually called in this session, and whether attachments were present. Mark any field not directly observable as unknown rather than inferring it.`;
}

/* ---------- Shared state ----------
   Phase 1 is the single source of truth for dataset, categories, and ratings.
   Phase 2 reads this and never re-asks. localStorage (not session) so closing
   the tab between phases doesn't wipe 50 minutes of work. */

const STATE_KEY = "aibench";

function getState() {
  let s = {};
  try {
    s = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
  } catch (e) {
    s = {};
  }
  return s;
}
function setState(patch) {
  const s = Object.assign(getState(), patch);
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(s));
  } catch (e) {}
  return s;
}

/* ---------- Track: solo vs. group session ----------
   Chosen on the entry page and stored alongside everything else. Solo runs
   Phase 1 only; a group session runs Phases 1 and 2. Pages carry both tracks'
   markup and let CSS hide what doesn't apply, so there's one copy of each page.
   applyTrack() runs from <head>, before paint, so nothing flashes. */

function activeTrack() {
  return getState().mode === "solo" ? "solo" : "group";
}
function applyTrack() {
  document.documentElement.setAttribute("data-track", activeTrack());
}
/* Picking a track on the entry page starts a run. If the last one was already
   submitted, this is a second run — a different dataset, or the same person
   switching tracks — so it starts from a clean sheet rather than inheriting the
   finished one's dataset, ratings and locks. */
function setTrack(t) {
  const mode = t === "solo" ? "solo" : "group";
  if (runSubmitted(getState())) resetRun();
  setState({ mode: mode });
  applyTrack();
}

/* Has this run been sent? Solo submits at the end of Phase 1, a guided session
   once at the end of Phase 2 — either way, that's the run over, and everything
   we were holding shut can open again. */
function runSubmitted(s) {
  return activeTrack() === "solo"
    ? !!s.phase1SubmittedAt
    : !!s.phase2SubmittedAt;
}

/* Wipe the run, keep the person. Name and email are theirs, not the run's, so
   a second dataset doesn't make them type them again; the session id is
   deliberately dropped, so the new run groups separately in the sheet. */
function resetRun() {
  const s = getState();
  const keep = {
    mode: s.mode,
    participantName: s.participantName || "",
    participantEmail: s.participantEmail || "",
  };
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(keep));
  } catch (e) {}
  return keep;
}

/* Has Phase 1 actually been filled in? */
function hasPhase1(s) {
  return !!(s.dataset && categoriesFromState(s).length);
}

/* Resolve the chosen dataset, including a bring-your-own one. */
function datasetFromState(s) {
  const key = s.dataset || "nhis";
  /* A saved key can outlive its entry if the picker list is edited. */
  if (key !== "custom") return DATASETS[key] || DATASETS.nhis;
  const c = s.custom || {};
  return {
    title: c.title || "",
    org: c.org || "",
    description: c.description || "",
    url: c.url || "",
    custom: true,
  };
}

/* Which rubric categories this participant is assessing. Solo participants pick
   any or all six; in a guided session the moderator assigns a triad, so the
   triad select is the starting point rather than a lock. Returns [] when Phase 1
   hasn't been filled in — callers that must render something use the default. */
function categoriesFromState(s) {
  if (Array.isArray(s.cats)) return s.cats.filter((k) => RUBRIC[k]);
  if (TRIADS[s.triad]) return TRIADS[s.triad].categories;
  return [];
}
function categoriesOrDefault(s) {
  const c = categoriesFromState(s);
  return c.length ? c : TRIADS.a.categories;
}

/* ---------- Small helpers ---------- */

function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function slug(v) {
  return String(v)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function setValue(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v || "";
}
/* Point every [data-form="…"] link at its form. Links keep their markup href
   until a real URL is filled in above, so none of them go nowhere. */
function wireFormLinks(name) {
  const url = FORM_URLS[name];
  if (!url) return;
  document.querySelectorAll(`a[data-form='${name}']`).forEach((a) => {
    a.href = url;
  });
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const prev = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => {
      btn.textContent = prev;
    }, 1500);
  });
}

/* Participants download their work as a file and attach it to the submission
   form, rather than carrying it on the clipboard between tabs. */
function downloadText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/* Filenames carry the dataset so a facilitator can tell submissions apart. */
function downloadName(s, kind) {
  const d = datasetFromState(s);
  return `${slug(d.title || "dataset")}-${kind}.md`;
}

function wireDownload(id, kind, build) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => {
    const s = getState();
    downloadText(downloadName(s, kind), build(s));
    const prev = btn.textContent;
    btn.textContent = "Downloaded";
    setTimeout(() => {
      btn.textContent = prev;
    }, 1500);
  });
}

const RATING_OPTIONS = [
  "",
  "Gone",
  "High Risk",
  "Moderate Risk",
  "No Known Issue",
  "Couldn't assess",
];

/* ---------- Rendering ---------- */

/* The dropdown is built here rather than written into phase-1.html, so adding a
   dataset stays a one-line edit to DATASETS. Featured ones lead; the long list
   follows in the order it's declared, which is alphabetical. */
function renderDatasetOptions(sel) {
  const byTitle = (a, b) => DATASETS[a].title.localeCompare(DATASETS[b].title);
  const options = (keys) =>
    keys
      .sort(byTitle)
      .map((k) => `<option value="${k}">${esc(DATASETS[k].title)}</option>`)
      .join("");
  /* An empty group would render as a stray label, so groups only exist when
     they hold something. */
  const group = (label, keys) =>
    keys.length ? `<optgroup label="${label}">${options(keys)}</optgroup>` : "";

  /* Only datasets America's Data Index has assessed are offered — without ground
     truth there's no comparison to make at the end. */
  const keys = Object.keys(DATASETS).filter((k) => k !== "custom" && DI[k]);
  const featured = keys.filter((k) => DATASETS[k].featured);
  const rest = keys.filter((k) => !DATASETS[k].featured);

  /* No entry currently sets `featured`, so this is one flat alphabetical list.
     Setting it on any entry brings the two-group layout back by itself. */
  const body = featured.length
    ? group("Featured", featured) + group("All datasets", rest)
    : options(rest);

  sel.innerHTML =
    '<option value="">— choose a dataset —</option>' +
    body +
    '<option value="custom">Another federal dataset (bring your own)</option>';
}

function renderDatasetCard(el, s) {
  const d = datasetFromState(s);
  /* The bring-your-own guidance lives under the dropdown, next to the decision
     it explains — so nothing renders here until there's a dataset to show. */
  if (!s.dataset || (d.custom && !d.title)) {
    el.innerHTML = "";
    el.hidden = true;
    return;
  }
  el.hidden = false;
  const link = d.url
    ? `<a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a>`
    : "";
  const meta = [esc(d.org), link].filter(Boolean).join(" · ");
  /* Most of the list is a name and a link. Say so plainly rather than showing
     empty fields — establishing the publisher and remit is part of the work. */
  const body = d.description
    ? `<p>${esc(d.description)}</p>`
    : '<p class="hint">We hold the name and the link, and nothing more. Working out ' +
      "who publishes it, under what authority, and who relies on it is part of the " +
      "research.</p>";
  el.innerHTML = `
    <h3>${esc(d.title)}</h3>
    ${meta ? `<p class="meta">${meta}</p>` : ""}
    ${body}`;
}

function rubricTable(c) {
  const rows = Object.entries(c.levels)
    .map(
      ([lvl, txt]) =>
        `<tr><th class="lvl lvl-${slug(lvl)}">${lvl}</th><td>${txt}</td></tr>`,
    )
    .join("");
  return `<table class="rubric"><tbody>${rows}</tbody></table>`;
}

function renderRubric(el, categoryKeys) {
  el.innerHTML = categoryKeys
    .map((k) => {
      const c = RUBRIC[k];
      const caveat = c.caveat ? `<p class="flag-block">${c.caveat}</p>` : "";
      return `<section class="rubric-cat">
      <h3>${c.name}</h3>${caveat}
      ${rubricTable(c)}
    </section>`;
    })
    .join("");
}

/* Category picker, which differs by track. Solo participants choose freely, so
   they get checkboxes. A guided session has a moderator assigning triads, so
   they get the triad select plus a note that it's the moderator's call —
   guidance, not a lock. Both write the same state.cats. */
function renderCategoryPicker(el, s) {
  const chosen = categoriesFromState(s);
  if (activeTrack() === "solo") {
    const boxes = CATEGORY_ORDER.map(
      (k) => `
      <label class="check">
        <input type="checkbox" data-cat-toggle="${k}"${chosen.includes(k) ? " checked" : ""}>
        ${RUBRIC[k].name}
      </label>`,
    ).join("");
    el.innerHTML = `
      <fieldset class="checkset">
        <legend>Categories to assess</legend>
        ${boxes}
        <p class="hint">Take as many as you have time for — one is a real answer,
        all six is a long sitting. Three is a comfortable hour.</p>
      </fieldset>`;
    return;
  }
  const opts = Object.entries(TRIADS)
    .map(
      ([k, t]) =>
        `<option value="${k}"${s.triad === k ? " selected" : ""}>${t.label}</option>`,
    )
    .join("");
  el.innerHTML = `
    <div>
      <label for="triad-select">Categories to assess</label>
      <select id="triad-select">${opts}</select>
    </div>`;
}

/* Phase 1 worksheet: rubric + the participant's own rating and evidence. */
function renderWorksheet(el, categoryKeys, s) {
  const ratings = s.ratings || {};
  if (!categoryKeys.length) {
    el.innerHTML =
      '<p class="hint">Choose at least one category above and its ' +
      "rubric and worksheet will appear here.</p>";
    return;
  }
  el.innerHTML = categoryKeys
    .map((k) => {
      const c = RUBRIC[k];
      const r = ratings[k] || {};
      const opts = RATING_OPTIONS.map(
        (o) =>
          `<option value="${esc(o)}"${r.level === o ? " selected" : ""}>${o || "— choose a level —"}</option>`,
      ).join("");
      return `<section class="rubric-cat">
      <h3>${c.name}</h3>
      ${rubricTable(c)}
      <div class="worksheet" data-cat="${k}">
        <p class="worksheet-title">Your assessment</p>
        <div>
          <label for="lvl-${k}">Risk level</label>
          <select id="lvl-${k}" data-field="level">${opts}</select>
        </div>
        <div>
          <label for="ev-${k}">Site URLs and Evidence</label>
          <textarea id="ev-${k}" data-field="evidence" rows="3"
            placeholder="What did you find, and where?">${esc(r.evidence)}</textarea>
        </div>
      </div>
    </section>`;
    })
    .join("");
}

/* Plain-text dump of the Phase 1 worksheet, for pasting into the official form. */
function worksheetText(s) {
  const d = datasetFromState(s);
  const lines = [
    "# Phase 1 worksheet",
    "",
    `Dataset: ${d.title || "(not set)"}`,
    `Publisher: ${d.org || "(not set)"}`,
    `URL: ${d.url || "(not set)"}`,
    "",
  ];
  categoriesOrDefault(s).forEach((k) => {
    const r = (s.ratings || {})[k] || {};
    lines.push(`## ${RUBRIC[k].name}`);
    lines.push(`Risk level: ${r.level || "(not rated)"}`);
    lines.push(`Site URLs and evidence: ${r.evidence || "(none recorded)"}`);
    lines.push("");
  });
  return lines.join("\n").trim();
}

function wireCopyButtons(root) {
  (root || document).querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      copyText(
        btn,
        document.getElementById(btn.dataset.copyTarget).textContent,
      );
    });
  });
}

/* ---------- Phase 1 ---------- */

function initPhase1() {
  const dsSelect = document.getElementById("dataset-select");
  const dsCard = document.getElementById("dataset-card");
  const customFields = document.getElementById("custom-dataset-fields");
  const customHint = document.getElementById("custom-dataset-hint");
  const catPicker = document.getElementById("category-picker");
  const rubricEl = document.getElementById("triad-rubric");

  const state = getState();
  renderDatasetOptions(dsSelect);
  if (state.dataset && DATASETS[state.dataset]) dsSelect.value = state.dataset;
  const c = state.custom || {};
  setValue("c-title", c.title);
  setValue("c-org", c.org);
  setValue("c-desc", c.description);
  setValue("c-url", c.url);

  function saveCustom() {
    setState({
      custom: {
        title: document.getElementById("c-title").value,
        org: document.getElementById("c-org").value,
        description: document.getElementById("c-desc").value,
        url: document.getElementById("c-url").value,
      },
    });
  }

  function refreshDataset() {
    const isCustom = dsSelect.value === "custom";
    customFields.hidden = !isCustom;
    if (customHint) customHint.hidden = !isCustom;
    setState({ dataset: dsSelect.value });
    renderDatasetCard(dsCard, getState());
    refreshContinue();
  }

  function refreshRubric() {
    renderWorksheet(rubricEl, categoriesFromState(getState()), getState());
  }

  /* The picker is rebuilt only on load; from then on its controls just write
     state and re-render the worksheet under it. A guided session starts on
     Triad A so the select and the worksheet agree; solo starts empty, because
     choosing is the participant's job there. */
  renderCategoryPicker(catPicker, state);
  if (activeTrack() !== "solo" && !categoriesFromState(state).length) {
    setState({ triad: "a", cats: TRIADS.a.categories });
  }
  catPicker.addEventListener("change", (e) => {
    const t = e.target;
    if (t.id === "triad-select") {
      setState({ triad: t.value, cats: TRIADS[t.value].categories });
    } else if (t.dataset && t.dataset.catToggle) {
      const picked = new Set(categoriesFromState(getState()));
      if (t.checked) picked.add(t.dataset.catToggle);
      else picked.delete(t.dataset.catToggle);
      setState({ cats: CATEGORY_ORDER.filter((k) => picked.has(k)) });
    } else {
      return;
    }
    refreshRubric();
    refreshContinue();
    guardNav();
  });

  dsSelect.addEventListener("change", refreshDataset);
  ["c-title", "c-org", "c-desc", "c-url"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("input", () => {
        saveCustom();
        refreshDataset();
      });
  });

  /* Delegated — the worksheet is re-rendered whenever the triad changes. */
  rubricEl.addEventListener("input", (e) => {
    const field = e.target.dataset && e.target.dataset.field;
    if (!field) return;
    const cat = e.target.closest("[data-cat]").dataset.cat;
    const ratings = Object.assign({}, getState().ratings);
    ratings[cat] = Object.assign({}, ratings[cat], { [field]: e.target.value });
    setState({ ratings: ratings });
    refreshContinue();
    guardNav();
  });

  const refreshContinue = initContinueGate();

  refreshDataset();
  refreshRubric();
  refreshContinue();
  initLockToggle();
  applyPhase1Lock();
  guardNav();

  bindField("p-name", "participantName");
  bindField("p-email", "participantEmail");

  wireDownload("download-worksheet", "phase-1-worksheet", worksheetText);
  /* Solo participants submit here, because Phase 1 is the whole exercise for
     them. A guided session submits once, at the end of Phase 2, and that one
     record carries these ratings too. */
  if (activeTrack() !== "solo") return;
  initSubmit({
    button: "submit-assessment",
    status: "submit-status",
    stateKey: "phase1SubmittedAt",
    validate: phase1Problem,
    payload: phase1Payload,
    success: "Submitted — thank you.",
  });
}

/* ---------- Submission ----------
   Phase 1 posts straight to a Google Apps Script web app, which appends one row
   per rubric category to a Sheet. Both tracks submit; nothing else about the
   flow differs. Content-Type is text/plain deliberately: it keeps the request
   "simple" in CORS terms, so the browser skips the preflight that Apps Script
   has no way to answer. */

/* A stable per-browser id, minted on first submission and reused. It's what
   joins someone's Phase 1 rows to their Phase 2 rows in the sheet. Never shown
   to the participant and never echoed back by the endpoint — it exists for
   grouping, not for them to quote at us. */
function sessionId() {
  const s = getState();
  if (s.sessionId) return s.sessionId;
  let id;
  try {
    id = crypto.randomUUID();
  } catch (e) {
    id = "s-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
  setState({ sessionId: id });
  return id;
}

/* Fields both phases send. */
function submissionEnvelope(s, form) {
  const d = datasetFromState(s);
  return {
    form: form,
    sessionId: sessionId(),
    track: activeTrack(),
    submittedAt: new Date().toISOString(),
    participant: {
      name: s.participantName || "",
      email: s.participantEmail || "",
    },
    dataset: {
      key: s.dataset || "",
      title: d.title || "",
      org: d.org || "",
      url: d.url || "",
      custom: !!d.custom,
    },
  };
}

function phase1Payload(s) {
  const ratings = s.ratings || {};
  const body = submissionEnvelope(s, "phase-1-assessment");
  body.categories = categoriesFromState(s).map((k) => ({
    key: k,
    name: RUBRIC[k].name,
    level: (ratings[k] || {}).level || "",
    evidence: (ratings[k] || {}).evidence || "",
  }));
  return body;
}

/* For a guided session this is the only submission, so it carries the Phase 1
   assessment as well as the Phase 2 agent notes. */
function phase2Payload(s) {
  const ratings = s.ratings || {};
  const body = submissionEnvelope(s, "phase-2-session");
  body.shareLink = s.shareLink || "";
  body.agentUsed = s.agentUsed || "";
  body.categories = categoriesOrDefault(s).map((k) => {
    const n = aiNote(s, k);
    return {
      key: k,
      name: RUBRIC[k].name,
      level: (ratings[k] || {}).level || "",
      evidence: (ratings[k] || {}).evidence || "",
      coachedLevel: n.level || "",
      agentAdded: n.note || "",
      agentUrls: n.urls || "",
    };
  });
  return body;
}

/* What has to be true before we'll send anything. */
function phase1Problem(s) {
  const ready = phase1ReadyProblem(s);
  if (ready) return ready;
  if (!(s.participantName || "").trim())
    return "Add your name so we can attribute the assessment.";
  return "";
}

function phase2Problem(s) {
  if (!hasPhase1(s))
    return "We can't find your Phase 1 choices in this browser, so there's nothing to attach this to.";
  if (!(s.participantName || "").trim())
    return "We don't have your name from Phase 1 in this browser. Add it there and it will carry over.";
  return "";
}

/* ---------- Phase 1 lock ----------
   Once someone legitimately opens Phase 2, their Phase 1 answers are frozen.
   Phase 2's prompts are generated from the dataset and categories, and the
   single guided submission carries the ratings, so a late edit would silently
   desynchronise what the agent was asked from what we record.

   It's a nudge, not a cage: the participant can unlock it themselves from the
   notice on Phase 1, and that choice sticks. Wandering off to the rubric and
   coming back — or re-opening Phase 2 — must never quietly re-lock it. */

/* Called on entry to Phase 2. Two conditions, both required: Phase 1 has to be
   complete (otherwise they landed here by URL or a stale link, and freezing a
   half-filled page helps nobody), and the lock is only ever set once. */
function lockPhase1() {
  const s = getState();
  if (s.phase1Locked) return;
  if (phase1ReadyProblem(s)) return;
  setState({ phase1Locked: true });
}

/* The padlock in the corner of the notice. A plain toggle — no code, no
   moderator — because the lock exists to stop absent-minded edits, not people. */
function initLockToggle() {
  const btn = document.querySelector("#phase1-lock .lock-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    setPhase1Unlocked(!phase1Unlocked());
    guardNav();
  });
}

/* The participant's own override, from the lock button on the Phase 1 notice. */
function phase1Unlocked() {
  return !!getState().phase1Unlocked;
}
function setPhase1Unlocked(v) {
  setState({ phase1Unlocked: !!v });
  applyPhase1Lock();
}

var PHASE1_INPUTS = [
  "#dataset-select",
  "#custom-dataset-fields input",
  "#custom-dataset-fields textarea",
  "#category-picker select",
  "#category-picker input",
  "#triad-rubric select",
  "#triad-rubric textarea",
].join(", ");

/* Padlock glyphs for the notice's toggle. Same body, different shackle. */
const LOCK_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M7 10V7a5 5 0 0 1 10 0v3"/><rect x="4" y="10" width="16" height="10" rx="2"/></svg>';
const UNLOCK_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M7 10V7a5 5 0 0 1 9.6-2"/><rect x="4" y="10" width="16" height="10" rx="2"/></svg>';

function applyPhase1Lock() {
  const s = getState();
  /* Once the run has been submitted the lock has nothing left to protect, so
     it lifts on its own and the notice goes away entirely. */
  const engaged = !!s.phase1Locked && !runSubmitted(s);
  const locked = engaged && !phase1Unlocked();
  const notice = document.getElementById("phase1-lock");

  /* The notice stays up once the lock has been engaged, whichever way the
     toggle is set — otherwise unlocking would remove the only way back. */
  if (notice) {
    notice.hidden = !engaged;
    notice.classList.toggle("locked", locked);
    const title = notice.querySelector(".callout-title");
    const body = notice.querySelector(".lock-note");
    const btn = notice.querySelector(".lock-toggle");
    if (title)
      title.textContent = locked ? "Results locked" : "Results unlocked";
    if (body)
      body.textContent = locked
        ? "Please don't adjust any results after moving on to Phase 2. Click unlock to override only if necessary."
        : "These fields are editable again. Click the padlock to lock them back down.";
    if (btn) {
      btn.innerHTML =
        (locked ? LOCK_ICON : UNLOCK_ICON) +
        '<span class="lock-toggle-text">' +
        (locked ? "Unlock" : "Lock") +
        "</span>";
      /* The label is the action, not the state — "Unlock" while locked. */
      btn.setAttribute(
        "aria-label",
        locked ? "Unlock Phase 1 answers" : "Lock Phase 1 answers",
      );
    }
  }

  /* Assign rather than only ever setting true, so the toggle re-opens the
     fields without a reload. */
  document.querySelectorAll(PHASE1_INPUTS).forEach((el) => {
    el.disabled = locked;
  });
}

/* What must be filled in before a guided participant can start Phase 2. */
function phase1ReadyProblem(s) {
  const d = datasetFromState(s);
  if (!s.dataset) return "Pick a dataset in section 1 before moving on.";
  if (d.custom && !(d.title || "").trim())
    return "Give your own dataset a title in section 1 before moving on.";
  const cats = categoriesFromState(s);
  if (!cats.length)
    return "Pick at least one rubric category in section 2 before moving on.";
  const unrated = cats.filter((k) => !((s.ratings || {})[k] || {}).level);
  if (unrated.length)
    return (
      "Give every category a risk level in section 4. Still blank: " +
      unrated.map((k) => RUBRIC[k].name).join(", ") +
      '. "Couldn\'t assess" is a valid answer.'
    );
  return "";
}

/* The continue link is a link, not a button, so refuse the click rather than
   pretending it isn't there. */
function initContinueGate() {
  const link = document.getElementById("continue-phase-2");
  const note = document.getElementById("continue-note");
  if (!link || !note) return function () {};

  link.addEventListener("click", (e) => {
    const problem = phase1ReadyProblem(getState());
    if (problem) {
      e.preventDefault();
      note.textContent = problem;
      note.className = "status error";
    }
  });

  return function refresh() {
    const problem = phase1ReadyProblem(getState());
    link.classList.toggle("disabled", !!problem);
    link.setAttribute("aria-disabled", problem ? "true" : "false");
    note.textContent = problem;
    note.className = problem ? "status error" : "status";
  };
}

/* Both phases submit through here. `stateKey` records that this phase has been
   sent, so coming back to the page says so. Nothing about the stored response
   is surfaced to the participant. */
function initSubmit(opts) {
  const btn = document.getElementById(opts.button);
  const status = document.getElementById(opts.status);
  if (!btn || !status) return;

  function say(msg, kind) {
    status.textContent = msg;
    status.className = "status" + (kind ? " " + kind : "");
  }

  if (getState()[opts.stateKey]) {
    say(
      "You've already submitted this once. Submitting again records a new response.",
      "ok",
    );
  }

  btn.addEventListener("click", async () => {
    const s = getState();
    if (!SUBMIT_URL) {
      say(
        "Submission isn't switched on yet. Save a copy of your work and send it to the team.",
        "error",
      );
      return;
    }
    const problem = opts.validate(s);
    if (problem) {
      say(problem, "error");
      return;
    }

    btn.disabled = true;
    say("Sending\u2026");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(opts.payload(s)),
      });
      const data = await res.json();
      if (!data || !data.ok)
        throw new Error((data && data.error) || "rejected");
      setState({ [opts.stateKey]: new Date().toISOString() });
      say(opts.success, "ok");
      guardNav();
    } catch (err) {
      say(
        "That didn't go through. Save a copy of your work and send it to the team, or try again in a moment.",
        "error",
      );
      btn.disabled = false;
    }
  });
}

/* ---------- Phase 2 ---------- */

/* Read-only recap of everything Phase 1 decided. Deliberately rendered
   outside the dark prompt blocks: this is context for the participant,
   not text to paste — the same values are already inside the prompts. */
function renderCarryover(el, s) {
  if (!hasPhase1(s)) {
    el.innerHTML = `<div class="carryover missing">
      <p class="label">Nothing carried over</p>
      <p>We couldn't find your Phase 1 choices in this browser. The prompts below fall
      back to defaults. <a href="phase-1.html">Go back to Phase 1</a> to set your dataset
      and categories — they should not change between phases.</p>
    </div>`;
    return;
  }
  const d = datasetFromState(s);
  const ratings = s.ratings || {};
  const rows = categoriesFromState(s)
    .map((k) => {
      const r = ratings[k] || {};
      const badge = r.level
        ? `<span class="rating-badge lvl-${slug(r.level)}">${esc(r.level)}</span>`
        : '<span class="rating-badge none">not rated</span>';
      return `<li>${RUBRIC[k].name} ${badge}</li>`;
    })
    .join("");
  const link = d.url
    ? ` · <a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a>`
    : "";

  el.innerHTML = `<div class="carryover">
    <p class="label">Carried over from Phase 1</p>
    <p><strong>${esc(d.title) || "(no dataset title)"}</strong>
      <span class="meta">${esc(d.org)}${link}</span></p>
    <p class="cats-intro">Your categories and ratings:</p>
    <ul class="cats">${rows}</ul>
    <p class="hint">The
      dataset details are already built into the prompts below, so there's nothing
      here you need to copy. Your own ratings are <strong>not</strong> in the prompts,
      because the agent has to reach its own conclusion.</p>
  </div>`;
}

/* Notes were plain strings before the extra-URLs field was added; anything saved
   under the old shape reads as the note. */
function aiNote(s, k) {
  const n = (s.aiNotes || {})[k];
  if (typeof n === "string") return { note: n };
  return n || {};
}

/* The one thing Phase 2 actually asks the participant to type. Note what the
   agent contributed, not what it concluded — the rubric values being compared on
   the results page come from a controlled run, not from transcription. */
function renderAiNotes(el, s) {
  const ratings = s.ratings || {};
  el.innerHTML = categoriesOrDefault(s)
    .map((k) => {
      const r = ratings[k] || {};
      const n = aiNote(s, k);
      const badge = r.level
        ? `<span class="rating-badge lvl-${slug(r.level)}">${esc(r.level)}</span>`
        : '<span class="rating-badge none">not rated</span>';
      const prior = r.evidence
        ? `<p class="prior"><span>Your Phase 1 evidence:</span> ${esc(r.evidence)}</p>`
        : '<p class="prior empty">No Phase 1 evidence recorded for this category.</p>';
      const opts = RATING_OPTIONS.map(
        (o) =>
          `<option value="${esc(o)}"${n.level === o ? " selected" : ""}>${o || "— choose a level —"}</option>`,
      ).join("");
      return `<section class="ai-note" data-cat="${k}">
      <h3>${RUBRIC[k].name} ${badge}</h3>
      ${prior}
      <label for="ai-lvl-${k}">Where the agent landed on risk level</label>
      <select id="ai-lvl-${k}" data-field="level">${opts}</select>
      <label for="ai-${k}">What the agent added that your research hadn't</label>
      <textarea id="ai-${k}" data-field="note" rows="3"
        placeholder="New sources, angles, or evidence — or leave blank">${esc(n.note)}</textarea>
      <label for="ai-url-${k}">Other URLs the agent surfaced</label>
      <textarea id="ai-url-${k}" data-field="urls" rows="2"
        placeholder="Sites you hadn't found yourself — one per line">${esc(n.urls)}</textarea>
    </section>`;
    })
    .join("");
}

function aiNotesText(s) {
  const d = datasetFromState(s);
  const ratings = s.ratings || {};
  const lines = [
    "# Phase 2 agent session",
    "",
    `Dataset: ${d.title || "(not set)"}`,
    `Agent used: ${s.agentUsed || "(not given)"}`,
    `Conversation share link: ${s.shareLink || "(none given)"}`,
    "",
  ];
  categoriesOrDefault(s).forEach((k) => {
    const r = ratings[k] || {};
    const n = aiNote(s, k);
    lines.push(`## ${RUBRIC[k].name}`);
    lines.push(`My Phase 1 rating: ${r.level || "(not rated)"}`);
    lines.push(`Where my agent landed: ${n.level || "(not recorded)"}`);
    lines.push(`What the agent added: ${n.note || "(nothing new)"}`);
    lines.push(`Other URLs the agent surfaced: ${n.urls || "(none)"}`);
    lines.push("");
  });
  return lines.join("\n").trim();
}

function initPhase2() {
  lockPhase1();
  guardNav();
  const state = getState();
  const cats = categoriesOrDefault(state);
  const dataset = datasetFromState(state);

  renderCarryover(document.getElementById("carryover"), state);

  document.getElementById("prompt-step-one").textContent =
    stepOnePrompt(dataset);
  document.getElementById("prompt-step-two").textContent = stepTwoPrompt(cats);
  document.getElementById("prompt-session-meta").textContent =
    sessionMetaPrompt();

  const notesEl = document.getElementById("ai-notes");
  renderAiNotes(notesEl, state);

  /* One delegated handler for both the selects and the textareas. */
  function saveNote(e) {
    const field = e.target.dataset && e.target.dataset.field;
    if (!field) return;
    const cat = e.target.closest("[data-cat]").dataset.cat;
    const aiNotes = Object.assign({}, getState().aiNotes);
    aiNotes[cat] = Object.assign({}, aiNote(getState(), cat), {
      [field]: e.target.value,
    });
    setState({ aiNotes: aiNotes });
  }
  notesEl.addEventListener("input", saveNote);
  notesEl.addEventListener("change", saveNote);

  bindField("share-link", "shareLink");
  bindField("agent-used", "agentUsed");
  bindField("p-name", "participantName");
  bindField("p-email", "participantEmail");

  wireDownload("download-ai-notes", "phase-2-agent-session", aiNotesText);
  initSubmit({
    button: "submit-session",
    status: "submit-status",
    stateKey: "phase2SubmittedAt",
    validate: phase2Problem,
    payload: phase2Payload,
    success: "Submitted — thank you.",
  });
  wireCopyButtons();

  wireFormLinks("evaluation");
  wireFormLinks("transcript");
}

/* Persist a single free-text field straight onto state. */
function bindField(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = getState()[key] || "";
  el.addEventListener("input", () => setState({ [key]: el.value }));
}

/* ---------- Navigation guard ----------
   Someone mid-exercise shouldn't be able to jump ahead, whether by button, nav
   bar, back-link or the wordmark. Only the rubric stays open throughout: it's
   reference material and contains no answers.

   This is a guard rail, not security. Anything client-side can be walked around
   by someone determined, and the ratings live in this browser anyway — the point
   is to stop honest mistakes and casual skipping, not to withstand attack. */

function pageName(href) {
  return (
    String(href || "")
      .split(/[?#]/)[0]
      .split("/")
      .pop() || "index.html"
  );
}

/* Have they committed to a dataset? A guided session is pre-seeded with Triad A,
   so categories alone don't mean anyone has started — the dataset choice does.
   Once it's made, wandering back to the entry page would let them switch track
   and lose the work. */
function workStarted(s) {
  return !!s.dataset;
}

/* Why this destination is closed, or "" if it's open. */
function navBlock(page, s) {
  if (page === "rubric.html") return "";
  if (page === pageName(location.pathname)) return "";
  /* Submitted means done. Every guard here exists to protect a run in progress,
     so once the run is in, the whole site opens up — including the entry page,
     for a second dataset or a swap between tracks. */
  if (runSubmitted(s)) return "";

  if (page === "phase-2.html") {
    return (
      phase1ReadyProblem(s) ||
      (hasPhase1(s) ? "" : "Finish Phase 1 before starting Phase 2.")
    );
  }

  if (page === "results.html") {
    if (activeTrack() === "solo") {
      return s.phase1SubmittedAt
        ? ""
        : "Results open once you've submitted your Phase 1 assessment.";
    }
    return s.phase2SubmittedAt
      ? ""
      : "Results open once you've submitted at the end of Phase 2.";
  }

  /* The entry page is where the track is chosen, so returning to it mid-exercise
     would silently switch someone's track and orphan their work. The overview is
     just context and stays open throughout. */
  if (page === "index.html") {
    return workStarted(s)
      ? "You're part-way through. Going back to the start would change your track and lose your work."
      : "";
  }

  return "";
}

/* The notice is built here rather than repeated in six HTML files. */
function navBlockNotice() {
  let el = document.getElementById("nav-block");
  if (el) return el;
  const main = document.querySelector("main");
  if (!main) return null;
  el = document.createElement("div");
  el.id = "nav-block";
  el.className = "callout locked";
  el.hidden = true;
  el.innerHTML =
    '<p class="callout-title">Not yet</p>' +
    '<p id="nav-block-why"></p>';
  main.insertBefore(el, main.firstChild);
  return el;
}

function guardNav() {
  const links = document.querySelectorAll(
    "nav.site a, a.wordmark, .backlink a, main a.btn[href]",
  );
  links.forEach((a) => {
    /* The wordmark is the site's title as much as a link. It stops navigating
       mid-exercise, but greying out the masthead reads as a fault, so it just
       goes quiet instead of announcing itself. */
    const isWordmark = a.classList.contains("wordmark");
    const reason = navBlock(pageName(a.getAttribute("href")), getState());
    a.classList.toggle("blocked", !!reason && !isWordmark);
    a.classList.toggle("inert", !!reason && isWordmark);
    a.classList.toggle("disabled", !!reason && a.classList.contains("btn"));
    a.setAttribute("aria-disabled", reason ? "true" : "false");
    if (a.dataset.guarded) return;
    a.dataset.guarded = "1";
    a.addEventListener("click", (e) => {
      const why = navBlock(pageName(a.getAttribute("href")), getState());
      if (!why) return;
      e.preventDefault();
      if (isWordmark) return;
      const notice = navBlockNotice();
      if (!notice) return;
      notice.querySelector("#nav-block-why").textContent = why;
      notice.hidden = false;
      notice.scrollIntoView({ block: "center" });
    });
  });
}

/* ---------- Entry page ---------- */

function initEntry() {
  document.querySelectorAll("[data-track-set]").forEach((el) => {
    el.addEventListener("click", () => setTrack(el.dataset.trackSet));
  });
}

/* Rubric reference page */
function initRubricPage() {
  guardNav();
  renderRubric(document.getElementById("full-rubric"), CATEGORY_ORDER);
}

/* ---------- Results ----------
   Three sets of rubric values for one dataset: yours from Phase 1, the background
   agent's from AGENT_RESULTS, and the Data Index's, which the participant records
   by hand once the embargo lifts. Nothing here is transcribed from a participant's
   own Phase 2 conversation — those notes are evidence about prompting, not a
   fourth rubric column. */

/* America's Data Index is the ground truth, loaded from js/data-index.js — never
   typed in by a participant. Guarded so a page that forgets the script tag
   degrades to an empty column instead of throwing. */
const DI = typeof DATA_INDEX !== "undefined" ? DATA_INDEX : {};

function dataIndexEntry(s) {
  return DI[s.dataset || "nhis"] || null;
}
function dataIndexResult(s, k) {
  const e = dataIndexEntry(s);
  return (e && e[k]) || {};
}

/* Downloads are plain text, so the Data Index's anchors become "label (url)". */
function stripTags(html) {
  return String(html || "")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, "$2 ($1)")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function levelCell(level) {
  return level
    ? `<span class="rating-badge lvl-${slug(level)}">${esc(level)}</span>`
    : '<span class="rating-badge none">—</span>';
}

function renderComparison(el, s) {
  const cats = categoriesOrDefault(s);
  const ratings = s.ratings || {};

  const rows = cats
    .map((k) => {
      const mine = ratings[k] || {};
      const coached = aiNote(s, k);
      const agent = agentResult(s, k);
      const idx = dataIndexResult(s, k);
      return `<tr data-cat="${k}">
      <th scope="row">${RUBRIC[k].name}</th>
      <td>${levelCell(mine.level)}</td>
      <td data-only="group">${levelCell(coached.level)}</td>
      <td>${levelCell(agent.level)}</td>
      <td>${levelCell(idx.level)}</td>
    </tr>`;
    })
    .join("");

  const entry = dataIndexEntry(s);
  const stamp =
    entry && entry.updated
      ? `<p class="hint">Data Index values as checked on ${esc(entry.updated)}. Its
       <a href="https://dataindex.us/collections/">collection page</a> is worth reading
       for the full picture behind them.</p>`
      : `<p class="hint">America's Data Index has no entry for this dataset, so its column
       is empty. <a href="https://dataindex.us/collections/">Browse the collections</a>
       to see how it treats comparable data.</p>`;

  const notice = !hasAgentRun(s)
    ? `<div class="callout"><p class="callout-title">No agent run for this dataset</p>
       <p>The background agent hasn't assessed
       <strong>${esc(datasetFromState(s).title)}</strong> yet, so its column is empty.
       Your own ratings and the Data Index's still compare.</p></div>`
    : AGENT_RESULTS_ARE_MOCK
      ? `<div class="callout"><p class="callout-title">Placeholder values</p>
         <p>The background agent's column below is stand-in data while the real run is
         prepared. Don't read anything into it yet.</p></div>`
      : "";

  el.innerHTML = `
    ${notice}
    ${stamp}
    <table class="compare-table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">You</th>
          <th scope="col" data-only="group">You + agent</th>
          <th scope="col">Background agent</th>
          <th scope="col">Data Index</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function comparisonText(s) {
  const d = datasetFromState(s);
  const entry = dataIndexEntry(s);
  const lines = ["# Comparison", "", `Dataset: ${d.title || "(not set)"}`];
  if (AGENT_RESULTS_ARE_MOCK && hasAgentRun(s)) {
    lines.push("Note: the background agent's values below are placeholders.");
  }
  if (entry && entry.updated) {
    lines.push(
      `Data Index values as checked on ${entry.updated}. More at ` +
        "https://dataindex.us/collections/",
    );
  }
  lines.push("");

  categoriesOrDefault(s).forEach((k) => {
    const mine = (s.ratings || {})[k] || {};
    const coached = aiNote(s, k);
    const agent = agentResult(s, k);
    const idx = dataIndexResult(s, k);
    lines.push(`## ${RUBRIC[k].name}`);
    lines.push("");
    lines.push(`You: ${mine.level || "(not rated)"}`);
    lines.push(`  ${mine.evidence || "(no evidence recorded)"}`);
    if (activeTrack() === "group") {
      lines.push(`You + agent: ${coached.level || "(not recorded)"}`);
      lines.push(`  ${coached.note || "(nothing new)"}`);
      if (coached.urls)
        lines.push(`  URLs: ${coached.urls.replace(/\s+/g, " ")}`);
    }
    lines.push(`Background agent: ${agent.level || "(no run)"}`);
    lines.push(`  ${agent.evidence || "(reasoning not yet published)"}`);
    lines.push(`America's Data Index: ${idx.level || "(no entry)"}`);
    lines.push(
      `  ${stripTags(idx.evidence) || "(no supporting note at this level)"}`,
    );
    lines.push("");
  });
  return lines.join("\n").trim();
}

/* Results are the answer key. They open only after this track's single
   submission has actually been sent. */
function resultsLocked(s) {
  if (activeTrack() === "solo") {
    if (s.phase1SubmittedAt) return "";
    return (
      "<p>Submit your Phase 1 assessment first.</p>" +
      '<p><a class="btn" href="phase-1.html">Back to Phase 1</a></p>'
    );
  }
  if (s.phase2SubmittedAt) return "";
  return (
    "<p>Submit your Phase 2 session first.</p>" +
    '<p><a class="btn" href="phase-2.html">Back to Phase 2</a></p>'
  );
}

function initResultsPage() {
  guardNav();
  const el = document.getElementById("comparison");
  const state = getState();

  const locked = resultsLocked(state);
  if (locked) {
    el.innerHTML =
      '<div class="callout locked"><p class="callout-title">Not yet</p>' +
      "<p>These are the answers. They unlock once your work is in.</p>" +
      locked +
      "</div>";
    document.querySelectorAll("[data-results-only]").forEach((n2) => {
      n2.hidden = true;
    });
    return;
  }

  if (!hasPhase1(state)) {
    el.innerHTML = `<div class="carryover missing">
      <p class="label">Nothing to compare yet</p>
      <p>We couldn't find your assessment in this browser.
      <a href="phase-1.html">Start with Phase 1</a>.</p>
    </div>`;
    return;
  }

  /* Read-only by design: every column is either the participant's own saved work
     or ground truth we ship. There is nothing here to type. */
  renderComparison(el, state);
  wireDownload("download-comparison", "comparison", comparisonText);
}
