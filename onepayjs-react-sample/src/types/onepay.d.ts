// src/types/onepay.d.ts
export {};

declare global {
  /**
   * Shape of the object expected by the OnePay SDK.
   * Extend as new fields become mandatory.
   */
  interface OnePayData {
    appid: string;
    hashToken: string;
    apptoken: string;
    transactionRedirectUrl: string;
    additionalData?: string;
    amount: number;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhoneNumber: string;
    orderReference: string;
    currency: string;
    // add any other optional keys here
    [key: string]: unknown;
  }

  interface Window {
    /** populated immediately before calling `onPayButtonClicked` */
    onePayData: OnePayData;
    openPaymentIframe:(url,id) => void;
    /** injected by https://storage.googleapis.com/onepayjs/onepayjs.js */
    onPayButtonClicked: () => void;
  }

  /** Fallback global for libraries that attach the function directly to the JS scope */
  var onPayButtonClicked: () => void;
}
