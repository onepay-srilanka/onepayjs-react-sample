import React, { useState, useEffect } from 'react';
interface OnePayResult {
  code: "201" | "400";
  transaction_id: string;
  status: "SUCCESS" | "FAIL";
}
type OnePayEvent = CustomEvent<OnePayResult>;


function App() {

  const [status, setStatus] = useState<OnePayResult | null>(null);

  /* register once, on mount */
  useEffect(() => {
    const handleSuccess = (e: Event) => {
      const evt = e as OnePayEvent;
      setStatus(evt.detail);            // update UI / state
      console.log("✅ payment success", evt.detail);
    };

    const handleFail = (e: Event) => {
      const evt = e as OnePayEvent;
      setStatus(evt.detail);
      console.log("payment failed", evt.detail);
    };

    window.addEventListener("onePaySuccess", handleSuccess);
    window.addEventListener("onePayFail", handleFail);

    /* CLEAN-UP on unmount */
    return () => {
      window.removeEventListener("onePaySuccess", handleSuccess);
      window.removeEventListener("onePayFail", handleFail);
    };
  }, []);
  

  const [formData, setFormData] = useState({
    currency: 'LKR',
    amount: '',
    app_id: '80NR1189D04CD635D8ACD',
    reference: '',
    customer_first_name: '',
    customer_last_name: '',
    customer_phone_number: '',
    customer_email: '',
    transaction_redirect_url: window.location.href,
    additional_data: '',
    items: ['item_57f132843c'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Set the global onePayData object that script.js uses
    window.onePayData = {
      currency: formData.currency,
      amount: parseFloat(formData.amount),
      appid: formData.app_id,
      hashToken: 'GR2P1189D04CD635D8AFD', // Replace with your actual hash token
      apptoken:
        'ca00d67bf74d77b01fa26dc6780d7ff9522d8f82d30ff813d4c605f2662cea9ad332054cc66aff68.EYAW1189D04CD635D8B20', // Replace with your actual app token
      orderReference: formData.reference,
      customerFirstName: formData.customer_first_name,
      customerLastName: formData.customer_last_name,
      customerPhoneNumber: formData.customer_phone_number,
      customerEmail: formData.customer_email,
      transactionRedirectUrl: formData.transaction_redirect_url,
      additionalData: formData.additional_data,
    };

    // Call the onPayButtonClicked function from script.js
    if (typeof window.onPayButtonClicked === 'function') {
      window.onPayButtonClicked();
    } else {
      console.error('onPayButtonClicked is not defined in script.js');
      alert('Payment functionality is not available. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Payment Details</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>
          <label htmlFor="amount">Amount (LKR)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="reference">Reference Number</label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="customer_first_name">First Name</label>
          <input
            type="text"
            id="customer_first_name"
            name="customer_first_name"
            value={formData.customer_first_name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="customer_last_name">Last Name</label>
          <input
            type="text"
            id="customer_last_name"
            name="customer_last_name"
            value={formData.customer_last_name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="customer_phone_number">Phone Number</label>
          <input
            type="tel"
            id="customer_phone_number"
            name="customer_phone_number"
            value={formData.customer_phone_number}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="customer_email">Email</label>
          <input
            type="email"
            id="customer_email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="additional_data">Additional Data</label>
          <input
            type="text"
            id="additional_data"
            name="additional_data"
            value={formData.additional_data}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default App;

