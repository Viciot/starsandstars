import React from 'react';
import emailjs from 'emailjs-com';

export default function SuggestionForm() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="form-stars" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <textarea name="message" placeholder="your suggestion here" />
      <button className='form-btn' type="submit" value="Send" >Send a Suggestion</button>
    </form>
  );
}

    




