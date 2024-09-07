// /api/submit-form.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('https://public.herotofu.com/v1/7bf7df50-6d53-11ef-95a6-6f38c376f913', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
        });
  
        if (!response.ok) {
          throw new Error('Error submitting form');
        }
  
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  