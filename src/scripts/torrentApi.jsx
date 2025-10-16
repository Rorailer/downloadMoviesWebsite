export async function sendToN8nWebhook(torrentUrl) {
  const webhookUrl = 'https://n8n.rorailer.site/webhook/torrentURL';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ url: torrentUrl[0] , name:torrentUrl[1] }), 
    });

    if (!response.ok) {
      // If the server response is not 2xx, throw an error
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // You can also process the response from n8n if it sends one
    const result = await response.json();
    console.log('Success:', result);

  } catch (error) {
    console.error('Error sending data to webhook:', error);
  }
}
