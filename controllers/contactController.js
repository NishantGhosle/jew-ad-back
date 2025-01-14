import Contact from '../models/contact.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'Thank you for reaching out to us!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
