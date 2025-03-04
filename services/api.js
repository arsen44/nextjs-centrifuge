import authAxios from "../helpers/utils";
import { Fetch_Earnings_Statistics, PAYMENT_CARDS_LIST } from "../helpers/constants";

export function fetchEarningsStatistics() {
  return authAxios
    .get(Fetch_Earnings_Statistics)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function userFetchPaymentCard() {
  return authAxios
    .get(PAYMENT_CARDS_LIST)
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => {
      throw err;
    });
}
