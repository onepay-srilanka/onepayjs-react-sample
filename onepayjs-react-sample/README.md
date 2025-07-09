
# Onepay JS React Implementation

This is about react onepayjs implementation. Use the following steps to add it to your project.

1. add the following script tag to html index page     
<script src="https://storage.googleapis.com/onepayjs/onepayv2.js"></script>



## code implementation

```javascript
import React, { useState } from 'react';

function App() {
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
   <div>Checkout form implementation</div>
  );
}

export default App;


```

