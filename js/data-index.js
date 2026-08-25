/* America's Data Index ratings for 47 datasets, from the checkup export
   dated 2026-07-08. Ground truth for the results comparison. Evidence strings
   carry anchor markup authored upstream and are rendered as HTML. */
const DATA_INDEX = {
  abs: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: {
      level: "No Known Issue",
      evidence:
        "The Business Enterprise Research and Development (BERD) Survey and ABS are being combined to increase data quality, reduce respondent burden, and to allow the Census Bureau to operate more efficiently.",
    },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  acs: {
    updated: "2026-08-12",
    historical: { level: "No Known Issue" },
    future: {
      level: "High Risk",
      evidence:
        "On August 4, 2026, the U.S. Census Bureau announced an indefinite delay in the release of data from the American Community Survey (ACS).",
    },
    quality: {
      level: "High Risk",
      evidence:
        "In an August 2, 2026 panel discussion at the Joint Statistical Meetings, Census Bureau leadership noted that changes to data availability and granulary are anticipated due to DAO 216-26.",
    },
    statutory: {
      level: "No Known Issue",
      evidence:
        'The <a target="_blank" rel="noopener" href="https://www.census.gov/programs-surveys/acs/about/acs-and-census.html#accordion-1ada6daff8-item-4800deff6d">ACS is required by law</a>.',
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        "From FY2024 to FY2026, the Census Bureau has lost more than 2,500 staff (approximately 20%).",
    },
    policy: { level: "No Known Issue" },
  },
  "agricultural-prices": {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence:
        'The collection of agricultural prices is required by federal law, governed primarily by the <a target="_blank" rel="noopener" href="https://uscode.house.gov/browse/prelim@title7&edition=prelim">U.S. Code Title 7</a>.',
    },
    staffing: {
      level: "High Risk",
      evidence:
        'From FY2024 to FY2026, USDA has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">lost more than 24,000 staff (~25%)</a>. Both the <a target="_blank" rel="noopener" href="https://www.usda.gov/sites/default/files/documents/fy-2027-budget-summary.pdf">FY2027 President\'s Budget</a> request and the <a target="_blank" rel="noopener" href="https://appropriations.house.gov/news/press-releases/house-passes-hr-8646-strong-agriculture-strong-communities-strong-america">House Appropriations budget proposal</a> for USDA include funding reductions, with proposed decreases of 19% and 1.4%, respectively.',
    },
    policy: { level: "No Known Issue" },
  },
  ahs: {
    updated: "2026-01-28",
    historical: { level: "No Known Issue" },
    future: {
      level: "Moderate Risk",
      evidence:
        'On May 12, 2025, <a target="_blank" rel="noopener" href="https://www.huduser.gov/portal/elist/2024-May-12.html">HUD announced</a> that, due to methodology changes that are intended to improve data processes, collection that was initially planned to begin May 1, 2025, was delayed until January 2026 or later.',
    },
    quality: {
      level: "No Known Issue",
      evidence:
        'On May 12, 2025, <a target="_blank" rel="noopener" href="https://www.huduser.gov/portal/elist/2024-May-12.html">HUD announced</a> a shift to a continuous data collection model, moving away from the previous periodic collection every other year that lasted 5 months.',
    },
    statutory: {
      level: "No Known Issue",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.census.gov/programs-surveys/ahs/about/ahs-introduction-history.html">According to the Census Bureau</a>, "Congress requires the Department of Housing and Urban Development to collect this information under the Housing and Urban-Rural Recovery Act of 1983 (Title 12 of the U.S.C., Section 1701z-1, 1701z-2(g), and 1701z-10a)."',
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.amstat.org/docs/default-source/amstat-documents/the-nations-data-at-risk-2025/census.pdf">The Census Bureau has lost an estimated 15% in staffing since FY24.</a>',
    },
    policy: {
      level: "High Risk",
      evidence:
        'An <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewDocument?ref_nbr=202502-2528-006">Information Collection Request</a> submitted on 3/12/2025 <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/DownloadDocument?objectID=154177301">removed questions on and references to gender identity</a> due to EO 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government.',
    },
  },
  aies: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  atus: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: {
      level: "High Risk",
      evidence:
        "The government shutdown suspended field operations temporarily. The effect on fall 2025 data collection is unknown.",
    },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.politico.com/news/2025/08/03/trump-labor-statistics-chief-fired-unemployment-00490988">The BLS Commissioner was removed</a>, many <a target="_blank" rel="noopener" href="https://www.bloomberg.com/news/articles/2025-09-09/third-of-bls-leadership-jobs-sit-empty-at-us-economic-statistics-agency">leadership roles remain vacant</a>, and <a target="_blank" rel="noopener" href="https://itep.org/trumps-firing-of-bls-commissioner-is-part-of-larger-erosion-of-federal-data-infrastructure/">reductions in staffing have affected the ability to maintain core data collections</a>. Prior to the shutdown, <a target="_blank" rel="noopener" href="https://www.bloomberg.com/news/articles/2025-09-15/bls-is-hiring-25-part-time-staff-to-collect-prices-for-cpi">hiring had resumed</a> to augment some data collection.',
    },
    policy: { level: "No Known Issue" },
  },
  bps: {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  "census-of-agriculture": {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence:
        'This agricultural census is required by law under the <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/105th-congress/house-bill/2366">\u201cCensus of Agriculture Act of 1997,\u201d Pub. L. No. 105-113 (7 U.S.C. 2204g)</a>. This law directs the U.S. Secretary of Agriculture to conduct the census of agriculture every fifth year.',
    },
    staffing: {
      level: "High Risk",
      evidence:
        'From FY2024 to FY2026, USDA has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">lost more than 24,000 staff (~25%)</a>. Both the <a target="_blank" rel="noopener" href="https://www.usda.gov/sites/default/files/documents/fy-2027-budget-summary.pdf">FY2027 President\'s Budget</a> request and the <a target="_blank" rel="noopener" href="https://appropriations.house.gov/news/press-releases/house-passes-hr-8646-strong-agriculture-strong-communities-strong-america">House Appropriations budget proposal</a> for USDA include funding reductions, with proposed decreases of 19% and 1.4%, respectively.',
    },
    policy: { level: "No Known Issue" },
  },
  ces: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.bls.gov/bls/2025-lapse-revised-release-dates.htm">BLS</a> will not publish an October 2025 Employment Situation news release. Establishment survey data from the Current Employment Statistics survey for October 2025 will be published with the November 2025 data. Household survey data from the Current Population Survey could not be collected for the October 2025 reference period due to a lapse in appropriations. The household survey data is not able to be retroactively collected. The collection period for November 2025 data will be extended for both surveys, and extra processing time will be added.',
    },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence: "Is a principal federal economic indicator.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.politico.com/news/2025/08/03/trump-labor-statistics-chief-fired-unemployment-00490988">The BLS Commissioner was removed</a>, many <a target="_blank" rel="noopener" href="https://www.bloomberg.com/news/articles/2025-09-09/third-of-bls-leadership-jobs-sit-empty-at-us-economic-statistics-agency">leadership roles remain vacant</a>, and <a target="_blank" rel="noopener" href="https://itep.org/trumps-firing-of-bls-commissioner-is-part-of-larger-erosion-of-federal-data-infrastructure/">reductions in staffing have affected the ability to maintain core data collections</a>. Prior to the shutdown, <a target="_blank" rel="noopener" href="https://www.bloomberg.com/news/articles/2025-09-15/bls-is-hiring-25-part-time-staff-to-collect-prices-for-cpi">hiring had resumed</a> to augment some data collection.',
    },
    policy: {
      level: "Moderate Risk",
      evidence:
        'President Trump <a target="_blank" rel="noopener" href="https://truthsocial.com/@realDonaldTrump/posts/114955222046259464">posted on Truth Social</a> on August 1, 2025, saying the job numbers are being rigged.<br/><br/>President Trump <a target="_blank" rel="noopener" href="https://truthsocial.com/@realDonaldTrump/posts/114954846612623858">posted on Truth Social</a> on August 1, 2025, saying Dr. Erika McEntarfer had manipulated the job numbers before the election.',
    },
  },
  cfs: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Department of Transportation\'s Office of the Secretary, which houses the Bureau of Transportation Statistics, <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">lost more than 20% of its staff</a>. In addition, the FY2027 House Appropriations Committee proposal would <a target="_blank" rel="noopener" href="https://appropriations.house.gov/news/press-releases/committee-releases-fy27-transportation-housing-and-urban-development-and">reduce the Department of Transportation\'s budget by approximately 10%</a>. From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  "construction-spending": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~ 20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  "consumer-credit": {
    updated: "2026-06-23",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'The Federal Reserve chair announced plans for a <a target="_blank" rel="noopener" href="https://www.nytimes.com/2025/05/16/business/federal-reserve-job-cuts.html">10% reduction in staffing in 2025</a> and <a target="_blank" rel="noopener" href="https://www.wsj.com/economy/central-banking/federal-reserve-to-reduce-bank-supervision-staff-by-30-84fcd65f">30% reduction</a> in the Supervision and Regulation Division.',
    },
    policy: { level: "No Known Issue" },
  },
  cpi: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: {
      level: "High Risk",
      evidence:
        'October 2025 report <a target="_blank" rel="noopener" href="https://www.bls.gov/bls/092025-cpi-reschedule-notice.htm">delayed due to the shutdown</a>, and the suspension of data collection due to the shutdown means that the <a target="_blank" rel="noopener" href="https://www.reuters.com/business/us-government-shutdown-may-prompt-first-ever-workaround-inflation-protected-2025-10-29/">November 2025 report will likely not be possible</a>.',
    },
    quality: {
      level: "Moderate Risk",
      evidence:
        'CPI data collection was <a target="_blank" rel="noopener" href="https://www.bls.gov/cpi/notices/2025/more-information-collection-reduction.htm">suspended in three cities and reduced by 15% in all other locations</a>. Some hiring has re-started but data collection operations have not been restored.',
    },
    statutory: {
      level: "No Known Issue",
      evidence: "Is a principal federal economic indicator.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.politico.com/news/2025/08/03/trump-labor-statistics-chief-fired-unemployment-00490988">The BLS Commissioner was removed</a>, many <a target="_blank" rel="noopener" href="https://www.bloomberg.com/news/articles/2025-09-09/third-of-bls-leadership-jobs-sit-empty-at-us-economic-statistics-agency">leadership roles remain vacant</a>, and <a target="_blank" rel="noopener" href="https://itep.org/trumps-firing-of-bls-commissioner-is-part-of-larger-erosion-of-federal-data-infrastructure/">reductions in staffing have affected the ability to maintain core data collections</a>. Prior to the shutdown, <a target="_blank" rel="noopener" href="https://www.bloomberg.com/news/articles/2025-09-15/bls-is-hiring-25-part-time-staff-to-collect-prices-for-cpi">hiring had resumed</a> to augment CPI data collection.',
    },
    policy: { level: "No Known Issue" },
  },
  "crop-production": {
    updated: "2026-06-17",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: {
      level: "Moderate Risk",
      evidence:
        'USDA <a target="_blank" rel="noopener" href="https://gvwire.com/2026/05/01/crop-undercount-raises-questions-about-reliability-of-usda-data/">under projection in 2025</a> raises questions about reliability of crop production data amid loss of 23,000 staff at USDA.',
    },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'From FY2024 to FY2026, USDA has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">lost more than 24,000 staff (~25%)</a>. Both the <a target="_blank" rel="noopener" href="https://www.usda.gov/sites/default/files/documents/fy-2027-budget-summary.pdf">FY2027 President\'s Budget</a> request and the <a target="_blank" rel="noopener" href="https://appropriations.house.gov/news/press-releases/house-passes-hr-8646-strong-agriculture-strong-communities-strong-america">House Appropriations budget proposal</a> for USDA include funding reductions, with proposed decreases of 19% and 1.4%, respectively.',
    },
    policy: { level: "No Known Issue" },
  },
  "economic-census": {
    updated: "2026-06-17",
    historical: { level: "No Known Issue" },
    future: {
      level: "No Known Issue",
      evidence:
        'While the ICR for <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202209-0607-001">2022 Economic Census has been expired for a year</a>, the Economic Census is only conducted every five years. A new ICR would need to be in place in early 2027.',
    },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence:
        "This data collection is required by law 13 U.S.C. sections 131 and 224.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  fevs: {
    updated: "2026-01-28",
    historical: { level: "No Known Issue" },
    future: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://federalnewsnetwork.com/workforce/2025/08/after-months-of-postponing-opm-opts-to-fully-cancel-2025-fevs/">The 2025 collection was canceled.</a>',
    },
    quality: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://federalnewsnetwork.com/workforce/2025/08/after-months-of-postponing-opm-opts-to-fully-cancel-2025-fevs/">The 2025 collection was canceled.</a>',
    },
    statutory: {
      level: "No Known Issue",
      evidence:
        "Agencies are required to conduct an annual survey with a core set of 16 questions.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://federalnewsnetwork.com/management/2025/07/opm-on-track-to-eliminate-1000-positions-by-the-end-of-the-year/">OPM has lost an estimated 36% of staff, as reported in July 2025.</a>',
    },
    policy: {
      level: "High Risk",
      evidence:
        'The website displays a <a target="_blank" rel="noopener" href="https://www.opm.gov/fevs/">banner</a> saying "The U.S. Office of Personnel Management is in the process of rescinding or revising reports, tools, files and other materials posted on this website in accordance with Executive Order 14151 Ending Radical and Wasteful Government DEI Programs and Preferencing, and Executive Order 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government. Any previously issued diversity, equity, inclusion or gender-ideology materials on this website should be considered rescinded."',
    },
  },
  "grain-stocks": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'From FY2024 to FY2026, USDA has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">lost more than 24,000 staff (~25%)</a>. Both the <a target="_blank" rel="noopener" href="https://www.usda.gov/sites/default/files/documents/fy-2027-budget-summary.pdf">FY2027 President\'s Budget</a> request and the <a target="_blank" rel="noopener" href="https://appropriations.house.gov/news/press-releases/house-passes-hr-8646-strong-agriculture-strong-communities-strong-america">House Appropriations budget proposal</a> for USDA include funding reductions, with proposed decreases of 19% and 1.4%, respectively.',
    },
    policy: { level: "No Known Issue" },
  },
  hifld: {
    updated: "2025-12-16",
    historical: {
      level: "Gone",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.napsgfoundation.org/hifld_open/">According to NAPSG Foundation</a>, HIFLD Open was discontinued on August 26, 2025, and the HIFLD website and HIFLD Open portal were no longer available after September 16, 2025.',
    },
    future: {
      level: "Gone",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.napsgfoundation.org/hifld_open/">According to NAPSG Foundation</a>, HIFLD Open was discontinued on August 26, 2025, and the HIFLD website and HIFLD Open portal were no longer available after September 16, 2025.',
    },
    quality: {
      level: "Gone",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.napsgfoundation.org/hifld_open/">According to NAPSG Foundation</a>, HIFLD Open was discontinued on August 26, 2025, and the HIFLD website and HIFLD Open portal were no longer available after September 16, 2025.',
    },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Gone",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.napsgfoundation.org/hifld_open/">According to NAPSG Foundation</a>, HIFLD Open was discontinued on August 26, 2025, and the HIFLD website and HIFLD Open portal were no longer available after September 16, 2025.',
    },
    policy: {
      level: "Gone",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.napsgfoundation.org/hifld_open/">According to NAPSG Foundation</a>, HIFLD Open was discontinued on August 26, 2025, and the HIFLD website and HIFLD Open portal were no longer available after September 16, 2025.',
    },
  },
  "housing-vacancies-and-homeownership": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  htops: {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: {
      level: "No Known Issue",
      evidence:
        'In the fall of 2024, the Census Bureau announced HTOPS as a successor to the Household Pulse Survey (HPS). The <a target="_blank" rel="noopener" href="https://www.census.gov/programs-surveys/household-pulse-survey/data/datasets.2025.html">February 2025 HTOPS public use file</a> was released in April 2025, but was posted to the HPS data product page and data from April 2025 and June 2025 were not published until early 2026.',
    },
    quality: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202502-0607-003">Per Executive Order 14168, gender identity questions were deleted from the survey, and \'sex at birth\' was replaced with \'sex\'.</a> Although the precursor to HTOPS was released on an ongoing, frequent basis (bi-weekly to monthly), to date only a February 2025 HTOPS public use file has been released.',
    },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202502-0607-003">Per Executive Order 14168, gender identity questions were deleted from the survey, and \'sex at birth\' was replaced with \'sex\'.</a>',
    },
  },
  "industrial-production-and-capacity-utilization": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  liheap: {
    updated: "2026-06-03",
    historical: { level: "No Known Issue" },
    future: { level: "Moderate Risk" },
    quality: {
      level: "Moderate Risk",
      evidence:
        'The <a target="_blank" rel="noopener" href="https://www.federalregister.gov/documents/2026/04/09/2026-06804/proposed-information-collection-activity-annual-report-on-households-assisted-by-the-low-income-home">Federal Register Notice</a> published on 4/9/26 proposed to "remove reporting requirements related to sex, race, and ethnicity, which are not required for statutory LIHEAP reporting or performance measurement" and "Remove data elements associated with supplemental LIHEAP funding provided under the Coronavirus Aid, Relief, and Economic Security Act and the American Rescue Plan Act, as these funding sources have expired and are no longer applicable to ongoing program operations."',
    },
    statutory: {
      level: "No Known Issue",
      evidence:
        "42 U.S.C. 8624, sec. 2610 requires LIHEAP data collection. The only demographics that are required to be collected are age and disability status.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'An April 2025 <a target="_blank" rel="noopener" href="https://www.finance.senate.gov/imo/media/doc/acf_reduction_in_force_letter.pdf">Senate report</a> notes that "In the last three months, ACF\u2019s staffing footprint has been reduced by between 35 to 40 percent." <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-changes">OPM\'s federal workforce data</a> shows a loss of more than 600 staff in FY2025 and FY2026. In addition, ACF is <a target="_blank" rel="noopener" href="https://www.hhs.gov/sites/default/files/fy-2027-acfc-cj.pdf">expected to have a substantial 11% reduction in budget</a> between FY2027 and the levels enacted in FY2026.',
    },
    policy: {
      level: "High Risk",
      evidence:
        'The <a target="_blank" rel="noopener" href="https://www.federalregister.gov/documents/2026/04/09/2026-06804/proposed-information-collection-activity-annual-report-on-households-assisted-by-the-low-income-home">Federal Register Notice</a> published on 4/9/26 proposed to "remove reporting requirements related to sex, race, and ethnicity, which are not required for statutory LIHEAP reporting or performance measurement."',
    },
  },
  m3: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  marts: {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~ 20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  mcbs: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "MCBS is mentioned, but not necessarily mandated, in 42 USC 1395b-8 and there are no alternatives since it provides insights that are not available in adminsitrative data",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'HHS lost <a target="_blank" rel="noopener" href="https://www.govexec.com/workforce/2025/10/substantial-layoffs-begin-federal-agencies-white-house-says/408752/">more than 10,000 staff</a> before the shutdown.',
    },
    policy: {
      level: "High Risk",
      evidence:
        "An Information Collection Request submitted on 4/9/2025 removed questions on gender identity and perceived discriminaton and made changes to sexual orientation items due to EO 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government.",
    },
  },
  meps: {
    updated: "2026-08-13",
    historical: { level: "No Known Issue" },
    future: {
      level: "No Known Issue",
    },
    quality: {
      level: "High Risk",
      evidence:
        "In May 2026, the ICR submission eliminated questions on sexual orientation, gender identity, and birth control in response to Executive Order 14168 and Make America Healthy Again (MAHA) priorities.",
    },
    statutory: {
      level: "No Known Issue",
      evidence:
        '42 U.S.C. § 299b-2 requires AHRQ to conduct a nationally representative survey that collects data on the cost, use, access to, and quality of health care, including health care expenditures, insurance coverage, payment sources, and patient experiences for the U.S. population."',
    },
    staffing: {
      level: "High Risk",
      evidence:
        "From FY2024 to FY2026, AHRQ lost about 70% of its workforce. The FY2027 House Committee Appropriations bill slashes funding and eliminates AHRQ.",
    },
    policy: {
      level: "High Risk",
      evidence:
        "The FY27 President's Budget and House Committee Appropriations bill proposes the elimination of the AHRQ, creating uncertainty about the agency's future operations. In May 2026, the ICR submission eliminated questions on sexual orientation, gender identity, and birth control in response to Executive Order 14168 and Make America Healthy Again (MAHA) priorities.",
    },
  },
  mhs: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, HUD staffing <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">decreased by more than 30%</a>. For fiscal year 2027, the Trump Administration proposed a <a target="_blank" rel="noopener" href="https://www.whitehouse.gov/wp-content/uploads/2026/04/budget_fy2027.pdf">13% reduction</a> in HUD funding. From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  "monthly-wholesale-trade": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  naep: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: {
      level: "High Risk",
      evidence:
        'NAEP testing has been <a target="_blank" rel="noopener" href="https://www.edweek.org/teaching-learning/fewer-subjects-students-data-points-feds-to-scale-back-naep/2025/04">scaled back to include fewer subjects and will be administered to fewer grades</a>.',
    },
    statutory: {
      level: "No Known Issue",
      evidence: "NAEP is listed in 20 USC 9622.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.edweek.org/policy-politics/naep-chief-peggy-carr-put-on-leave-by-trump-administration/2025/02">Nearly all NCES staff were terminated, the Commissioner of Education Statistics was removed,</a> and National Assessment Governing Board (NAGB) scaled back testing. Starting to rehire some positions.',
    },
    policy: {
      level: "High Risk",
      evidence:
        'An <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202410-1850-002">Information Collection Request</a> submitted on 5/15/2025 included changes driven by EO 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government, and EO 14151 Ending Radical and Wasteful Government DEI Programs and Preferencing.',
    },
  },
  "nass-peanut-prices": {
    updated: "2026-01-28",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence: "Authorized but there is no alternative data collection.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.amstat.org/docs/default-source/amstat-documents/the-nations-data-at-risk-2025/national-agricultural-statistics-service.pdf">NASS has lost an estimated 41% in staffing since FY24. </a>',
    },
    policy: { level: "No Known Issue" },
  },
  ncs: {
    updated: "2026-06-17",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence:
        "The Bureau of Labor Statistics \u201c\u2026is authorized and directed to make continuing studies of... labor costs in the manufacturing, mining, transportation, distribution, and other industries\u201d under Title 29 of the U.S. Code, (29 USC 2b) and this information supports a principal federal economic indicator.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'In 2025, the <a target="_blank" rel="noopener" href="https://www.politico.com/news/2025/08/03/trump-labor-statistics-chief-fired-unemployment-00490988">BLS Commissioner was removed</a> and as of 2026, many <a target="_blank" rel="noopener" href="https://www.bls.gov/bls/senior_staff/home.htm">leadership roles remain vacant</a>. BLS staffing has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">decreased by about 20% from FY2024 to FY2026</a>.',
    },
    policy: { level: "No Known Issue" },
  },
  ncvs: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.documentcloud.org/documents/25930013-bjs-memo-for-nonsubstantive-changes-to-2025-ncvs-scs-030325-final/#document/p1">Three questions on gender</a> have been <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202503-1121-001#">removed from the survey instrument</a>.',
    },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Title 34, United States Code, Section 10132 authorizes BJS to collect statistics on victimization, and NCVS is explicitly named when referring to data collection about select subpopulations.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'Census Bureau <a target="_blank" rel="noopener" href="https://news.bloomberglaw.com/daily-labor-report/census-bureau-hit-with-layoffs-as-100-get-notices-in-shutdown">lost more than 1,500 staff</a> before the shutdown. Unknown if BJS has been impacted.',
    },
    policy: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202503-1121-001">Three questions</a> on gender identity have been removed due to EO 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government. <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202504-1121-001">One question</a> on the victim\u2019s gender or gender identity as the basis for a hate crime remains, but the probe instructions have removed references to gender.',
    },
  },
  nhis: {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: {
      level: "High Risk",
      evidence:
        "The government shutdown suspended field operations temporarily. The effect on fall 2025 data collection is unknown.",
    },
    quality: {
      level: "High Risk",
      evidence:
        'Questions on <a target="_blank" rel="noopener" href="https://blog.popdata.org/food-security-data-cps/">food security</a> have been removed from the survey.',
    },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.statnews.com/2025/10/17/cdc-national-center-health-statistics-rif-layoff-impact/">NCHS staff positions appear to have been terminated during the shutdown.</a>',
    },
    policy: {
      level: "High Risk",
      evidence:
        'An <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202504-0920-017">Information Collection Request</a> submitted on 5/28/2025 removed two questions on gender identity due to EO 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government.',
    },
  },
  nsch: {
    updated: "2025-12-16",
    historical: {
      level: "Moderate Risk",
      evidence:
        'Question ACE12 on being treated unfairly because of sexual orientation or gender identity was removed from the 2023 technical documentation (<a target="_blank" rel="noopener" href="https://web.archive.org/web/20241207022830/https://www.childhealthdata.org/docs/default-source/nsch-docs/2023-nsch-guide-to-topics-and-questions_cahmi_drc.pdf">original document</a> and <a target="_blank" rel="noopener" href="https://www.childhealthdata.org/docs/default-source/nsch-docs/2023-nsch-guide-to-topics-and-questions_cahmi_drc.pdf">revised document</a>, see page 15) and the 2023 data frequencies document (<a target="_blank" rel="noopener" href="https://web.archive.org/web/20241225152848/https://www2.census.gov/programs-surveys/nsch/technical-documentation/codebook/NSCH_2023_Topical_Frequencies.pdf">original document</a> and <a target="_blank" rel="noopener" href="https://www2.census.gov/programs-surveys/nsch/technical-documentation/codebook/NSCH_2023_Topical_Frequencies.pdf">revised document</a>, see page 7).',
    },
    future: {
      level: "Moderate Risk",
      evidence:
        'The scheduled <a target="_blank" rel="noopener" href="https://respond.census.gov/nsch/faqs">October release of 2024 data</a> was missed, likely due to the shutdown.',
    },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'HHS lost <a target="_blank" rel="noopener" href="https://www.govexec.com/workforce/2025/10/substantial-layoffs-begin-federal-agencies-white-house-says/408752/">more than 10,000 employees</a> before the shutdown. The shutdown appears to have resulted in additional cuts at HRSA.',
    },
    policy: {
      level: "High Risk",
      evidence:
        'An <a target="_blank" rel="noopener" href="https://www.reginfo.gov/public/do/PRAViewICR?ref_nbr=202503-0607-004">Information Collection Request</a> submitted on 4/2/2025 detailed that when asking about a child\'s experiences, "treated or judged unfairly because of their sexual orientation or gender identity" was removed as a response option due to EO 14168 Defending Women From Gender Ideology Extremism and Restoring Biological Truth to the Federal Government.',
    },
  },
  ppi: {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.bls.gov/ppi/notices/2025/bls-to-discontinue-selected-ppis.htm">In mid-2025, approximately 350 individual index series were discontinued across commodity, industry, and Final Demand\u2013Intermediate Demand (FD-ID) classifications.</a>',
    },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'In 2025, the <a target="_blank" rel="noopener" href="https://www.politico.com/news/2025/08/03/trump-labor-statistics-chief-fired-unemployment-00490988">BLS Commissioner was removed</a> and as of 2026 many <a target="_blank" rel="noopener" href="https://www.bls.gov/bls/senior_staff/home.htm">leadership roles remain vacant</a>. BLS staffing has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">decreased by about 20% from FY2024 to FY2026</a>.',
    },
    policy: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.bls.gov/ppi/notices/2025/bls-to-discontinue-selected-ppis.htm">In mid-2025, approximately 350 individual index series were discontinued across commodity, industry, and Final Demand\u2013Intermediate Demand (FD-ID) classifications.</a>',
    },
  },
  qfr: {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence:
        "Specific authority to conduct the program in Title 13 of the United States Code, Section 91, which requires that financial statistics of business operations be collected and published quarterly. Public Law 114-72, Section 2 extended the authority of the Secretary of Commerce to conduct the QFR program through September 30, 2030.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels',
    },
    policy: {
      level: "High Risk",
      evidence:
        '<a target="_blank" rel="noopener" href="https://www.bls.gov/ppi/notices/2025/bls-to-discontinue-selected-ppis.htm">In mid-2025, approximately 350 individual index series were discontinued across commodity, industry, and Final Demand\u2013Intermediate Demand (FD-ID) classifications.</a>',
    },
  },
  qspp: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  qtax: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  rhfs: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, HUD staffing <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">decreased by more than 30%</a>. For fiscal year 2027, the Trump Administration proposed a <a target="_blank" rel="noopener" href="https://www.whitehouse.gov/wp-content/uploads/2026/04/budget_fy2027.pdf">13% reduction</a> in HUD funding. From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  scf: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'The Federal Reserve chair announced plans for a <a target="_blank" rel="noopener" href="https://www.nytimes.com/2025/05/16/business/federal-reserve-job-cuts.html">10% reduction in staffing in 2025</a> and <a target="_blank" rel="noopener" href="https://www.wsj.com/economy/central-banking/federal-reserve-to-reduce-bank-supervision-staff-by-30-84fcd65f">30% reduction</a> in the Supervision and Regulation Division.',
    },
    policy: { level: "No Known Issue" },
  },
  sipp: {
    updated: "2026-06-17",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: {
      level: "Moderate Risk",
      evidence:
        'The SIPP survey is in the <a target="_blank" rel="noopener" href="https://www.census.gov/data/academy/webinars/2026/sipp-modernization-program-update.html">process of being redesigned</a> and the administration has proposed <a target="_blank" rel="noopener" href="https://thecensusproject.org/2026/05/01/summary-of-census-bureau-fy2027-congressional-justification/">staffing and funding cuts to the program</a> which may impact data collection.',
    },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: {
      level: "Moderate Risk",
      evidence:
        'The SIPP survey is in the <a target="_blank" rel="noopener" href="https://www.census.gov/data/academy/webinars/2026/sipp-modernization-program-update.html">process of being redesigned</a> and the administration has proposed <a target="_blank" rel="noopener" href="https://thecensusproject.org/2026/05/01/summary-of-census-bureau-fy2027-congressional-justification/">staffing and funding cuts to the program</a> which may impact data collection.',
    },
  },
  soc: {
    updated: "2026-06-17",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  soma: {
    updated: "2026-06-22",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "High Risk",
      evidence: "Statutory authorization is vague.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, HUD staffing <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">decreased by more than 30%</a>. For fiscal year 2027, the Trump Administration proposed a <a target="_blank" rel="noopener" href="https://www.whitehouse.gov/wp-content/uploads/2026/04/budget_fy2027.pdf">13% reduction</a> in HUD funding. From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  "u-s-import-and-export-price-indices": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'In 2025, the <a target="_blank" rel="noopener" href="https://www.politico.com/news/2025/08/03/trump-labor-statistics-chief-fired-unemployment-00490988">BLS Commissioner was removed</a> and as of 2026, many <a target="_blank" rel="noopener" href="https://www.bls.gov/bls/senior_staff/home.htm">leadership roles remain vacant</a>. BLS staffing has <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">decreased by about 20% from FY2024 to FY2026</a>.',
    },
    policy: { level: "No Known Issue" },
  },
  "us-international-trade-in-goods-and-services": {
    updated: "2026-06-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the Census Bureau has lost more than <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">2,500 staff (~20%)</a>. While the <a target="_blank" rel="noopener" href="https://www.commerce.gov/sites/default/files/2025-06/Census-FY2026-Congressional-Budget-Submission.pdf">FY27 President\'s Budget</a> requests an approximately 30% increase for the Census Bureau, the proposal recommends reductions to many programs and surveys. In May 2026, the House Appropriations Committee advanced its <a target="_blank" rel="noopener" href="https://www.congress.gov/bill/119th-congress/house-bill/8845">version of the budget</a>, proposing level funding at FY26 levels.',
    },
    policy: { level: "No Known Issue" },
  },
  "usaspending-gov": {
    updated: "2025-12-16",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "No Known Issue",
      evidence: "USAspending (or a successor) is named in 31 USC 6101.",
    },
    staffing: {
      level: "High Risk",
      evidence:
        'Treasury lost <a target="_blank" rel="noopener" href="https://www.govexec.com/workforce/2025/10/substantial-layoffs-begin-federal-agencies-white-house-says/408752/">more than 25,000 staff</a> before the shutdown.',
    },
    policy: { level: "No Known Issue" },
  },
  wngsr: {
    updated: "2026-06-23",
    historical: { level: "No Known Issue" },
    future: { level: "No Known Issue" },
    quality: { level: "No Known Issue" },
    statutory: {
      level: "Moderate Risk",
      evidence:
        "Statutory authorization is vague, but information is required to support a principal federal economic indicator.",
    },
    staffing: {
      level: "Moderate Risk",
      evidence:
        'From FY2024 to FY2026, the DOE <a target="_blank" rel="noopener" href="https://data.opm.gov/explore-data/analytics/workforce-size-and-composition">lost more than 3,900 staff (~23%)</a>.',
    },
    policy: { level: "No Known Issue" },
  },
};
