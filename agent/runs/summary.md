# Background agent results

Averages are per run, one run per dataset. Error is distance on the rubric scale (No Known Issue 0, Moderate 1, High 2, Gone 3); bias is positive when the agent rates data safer than the Data Index.

| Model | Runs | Failed | Matches | Mean error | Median | Max | Bias | Cost / dataset | Total cost | Minutes / dataset | Searches | Fetches | Effort | Reasoning tokens |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| anthropic/claude-opus-5.5 | 47 | 0 | 131/282 (46%) | 0.58 | 1 | 2 | -0.38 | $2.33 | $109.71 | 3.9 | 17.6 | 6.7 | medium | 5,721 |
| deepseek/deepseek-v4-flash-0731 | 47 | 0 | 115/282 (41%) | 0.68 | 1 | 2 | -0.43 | $0.17 | $7.93 | 3.7 | 16.3 | 24.2 | high | 20,760 |
| deepseek/deepseek-v4-pro-0813 | 47 | 0 | 156/282 (55%) | 0.52 | 0 | 2 | -0.22 | $0.28 | $13.01 | 3.9 | 13.6 | 9.0 | high | 13,229 |
| moonshotai/kimi-k3 | 47 | 0 | 131/282 (46%) | 0.59 | 1 | 2 | -0.31 | $0.66 | $31.20 | 7.0 | 11.9 | 4.2 | high | 5,275 |
| openai/gpt-6.1-sol | 47 | 0 | 130/282 (46%) | 0.70 | 1 | 2 | -0.52 | $0.99 | $46.41 | 4.7 | 25.5 | 17.7 | medium | 651 |
| z-ai/glm-5.3 | 47 | 0 | 119/282 (42%) | 0.65 | 1 | 2 | -0.37 | $0.36 | $16.97 | 4.2 | 12.9 | 5.5 | high | 7,125 |

## Mean error by dataset

| Dataset | anthropic/claude-opus-5.5 | deepseek/deepseek-v4-flash-0731 | deepseek/deepseek-v4-pro-0813 | moonshotai/kimi-k3 | openai/gpt-6.1-sol | z-ai/glm-5.3 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| abs | 0.83 | 1.17 | 0.83 | 0.67 | 0.83 | 1.00 |
| acs | 0.67 | 0.83 | 0.67 | 0.67 | 0.67 | 0.83 |
| agricultural-prices | 0.50 | 0.83 | 0.67 | 0.50 | 0.83 | 0.50 |
| ahs | 0.67 | 0.67 | 0.67 | 0.67 | 0.67 | 0.50 |
| aies | 0.67 | 0.83 | 0.83 | 0.83 | 1.00 | 0.83 |
| atus | 0.67 | 0.83 | 0.67 | 0.50 | 0.50 | 0.67 |
| bps | 0.33 | 0.67 | 0.67 | 0.83 | 0.83 | 0.67 |
| census-of-agriculture | 0.33 | 0.33 | 0.33 | 0.33 | 0.50 | 0.50 |
| ces | 1.00 | 1.00 | 0.33 | 0.33 | 0.33 | 0.67 |
| cfs | 1.00 | 0.83 | 0.67 | 0.83 | 1.33 | 0.67 |
| construction-spending | 0.83 | 0.83 | 0.67 | 0.83 | 1.17 | 1.00 |
| consumer-credit | 0.33 | 0.50 | 0.17 | 0.17 | 0.83 | 0.50 |
| cpi | 0.33 | 0.67 | 0.50 | 0.50 | 0.50 | 0.50 |
| crop-production | 0.50 | 0.67 | 0.83 | 0.67 | 1.17 | 1.00 |
| economic-census | 0.67 | 0.67 | 0.67 | 0.67 | 0.83 | 0.50 |
| fevs | 0.33 | 0.67 | 0.33 | 0.50 | 1.17 | 0.33 |
| grain-stocks | 0.33 | 0.50 | 0.17 | 0.33 | 0.50 | 0.33 |
| hifld | 0.33 | 0.50 | 0.33 | 0.17 | 0.33 | 0.17 |
| housing-vacancies-and-homeownership | 0.67 | 0.67 | 0.50 | 0.67 | 1.17 | 0.67 |
| htops | 0.50 | 0.50 | 0.50 | 0.50 | 0.33 | 0.50 |
| industrial-production-and-capacity-utilization | 0.50 | 0.33 | 0.33 | 0.33 | 0.83 | 0.67 |
| liheap | 0.50 | 0.67 | 0.50 | 0.33 | 0.33 | 0.33 |
| m3 | 0.67 | 0.83 | 0.50 | 0.67 | 0.83 | 1.00 |
| marts | 0.67 | 0.67 | 0.33 | 0.83 | 1.00 | 1.00 |
| mcbs | 0.33 | 0.67 | 0.67 | 0.83 | 1.00 | 0.83 |
| meps | 0.00 | 0.00 | 0.17 | 0.17 | 0.33 | 0.33 |
| mhs | 0.83 | 1.00 | 0.83 | 0.67 | 1.00 | 1.00 |
| monthly-wholesale-trade | 0.67 | 0.83 | 0.67 | 0.83 | 1.00 | 0.67 |
| naep | 0.33 | 0.33 | 0.33 | 0.33 | 0.33 | 0.33 |
| nass-peanut-prices | 0.50 | 1.00 | 0.50 | 0.67 | 0.83 | 0.50 |
| ncs | 0.67 | 0.83 | 0.67 | 0.67 | 0.67 | 1.00 |
| ncvs | 0.33 | 0.33 | 0.17 | 0.17 | 0.50 | 0.33 |
| nhis | 0.67 | 0.83 | 1.00 | 0.67 | 0.50 | 0.83 |
| nsch | 0.67 | 0.67 | 0.67 | 0.83 | 0.50 | 0.33 |
| ppi | 0.50 | 0.33 | 0.33 | 0.33 | 0.33 | 0.50 |
| qfr | 0.67 | 0.50 | 0.33 | 0.67 | 0.33 | 0.33 |
| qspp | 0.67 | 0.67 | 0.50 | 0.50 | 0.67 | 0.83 |
| qtax | 0.83 | 0.83 | 0.50 | 0.83 | 0.67 | 0.83 |
| rhfs | 0.67 | 0.83 | 0.83 | 0.83 | 0.67 | 0.83 |
| scf | n/a | 0.50 | 0.33 | 0.17 | 0.17 | 0.33 |
| sipp | 0.83 | 0.83 | 0.83 | 1.17 | 0.33 | 1.00 |
| soc | 0.67 | 0.67 | 0.67 | 0.67 | 0.83 | 0.83 |
| soma | 0.67 | 0.67 | 0.50 | 0.67 | 0.67 | 0.50 |
| u-s-import-and-export-price-indices | 0.67 | 0.83 | 0.33 | 1.17 | 0.83 | 1.17 |
| us-international-trade-in-goods-and-services | 0.83 | 0.83 | 0.33 | 0.50 | 1.00 | 0.83 |
| usaspending-gov | 0.33 | 0.50 | 0.33 | 0.67 | 0.50 | 0.33 |
| wngsr | 0.33 | 0.83 | 0.33 | 0.17 | 0.67 | 0.67 |
