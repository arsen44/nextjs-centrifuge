// Base URL for Django Backend API
// Dev URL -- http://192.168.1.71:8000
// Dev URL Docker compose ---http://192.168.1.71:80
// Prod URL --https://roxodev.ru
// Prod WS_URL --wss://roxodev.ru/connection/websocket
// Dev WS_URL --ws://192.168.1.68:2152

export const baseUrl: string = 'http://192.168.1.68:8000';
export const GolangMicroserviseApi: string = 'http://192.168.1.68:2150';
export const WsbaseUrl: string = 'ws://192.168.1.68:2152/connection/websocket';

// DJANGO BACKEND API
export const restAuth: string = `${baseUrl}/api/client/create/`;
export const CODE_VERIFY: string = `${baseUrl}/api/verify_client_code/`;
export const userIDURL: string = '/user-id/';
export const REFRESH_TOKEN: string = `${baseUrl}/api/refresh-token/`;
export const Fetch_Earnings_Statistics: string = `${baseUrl}/api/partner-company/earnings-statistics/`;
export const COMPANY_UPDATE: string = `${baseUrl}/api/company-update/`;
export const PAYMENT_CARDS_LIST: string = `${baseUrl}/api/payment-cards-list/`;

// Partner
export const CONNECT_PARTNER_SUMBIT_API: string = `${baseUrl}/api/contact-partner/`;

// GOLANG MICROSERVISE API
export const GET_SUGGESTIONS_API: string = `${GolangMicroserviseApi}/get-suggestions/`; /// на Dev меня на url wsl //// Prod Nginx baseUrl
export const REVERSE_ADDRESS_API: string = `${GolangMicroserviseApi}/search_adres/`; /// на Dev меня на url wsl
export const BULIT_ROUTE_API: string = `${GolangMicroserviseApi}/build-route/`; /// на  build-route //Taxi  get/trip-build-route
export const CREATE_TRIP_API: string = `${GolangMicroserviseApi}/create_trip/`; /// на Dev меня на url wsl

// CARD PAYMENT SAVE
export const PAYMENT_CARDS_SAVE: string = `${GolangMicroserviseApi}/save-payments`;

// MediaFile URL
export const Media_Faile: string = `${baseUrl}/mediafile/`;