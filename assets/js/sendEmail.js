function sendMail(contactForm) {
  emailjs.send('service_5l11drd', 'CV_testing_email_3oq9h1d', {
      'from_name': contactForm.name.value,
      'from_email': contactForm.emailaddress.value,
      'message': contactForm.projectsummary.value,
      // 'project_request': contactForm.projectsummary.
    })
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
  // Il codice funziona, la chiave pubblica è nel file html,
  // ma questa ultima riga di codice è necessaria affinché possa
  // funzionare correttamente, non presente nella documentazione ufficiale
  return false;
}
