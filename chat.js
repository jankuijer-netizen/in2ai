//-------------------------------------------------------------
// i2ai Website Chat & Voice Widget (ElevenLabs Conversational AI)
// Vervangt de oude text-only chatbot met Lisa voice+text agent
// Externe JS - veilig voor Hostinger Website Builder
//-------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

                              //-------------------------------------------------------------
                              // ElevenLabs Conversational AI Widget
                              //-------------------------------------------------------------

                              // 1. Laad het ElevenLabs widget script
                              const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);

                              // 2. Nederlandse teksten voor de widget
                              const nlTexts = {
                                        main_label: "Hulp nodig?",
                                        start_call: "Start gesprek",
                                        start_chat: "Start chat",
                                        new_call: "Nieuw gesprek",
                                        end_call: "Beëindig gesprek",
                                        mute_microphone: "Microfoon dempen",
                                        change_language: "Taal wijzigen",
                                        collapse: "Inklappen",
                                        expand: "Uitklappen",
                                        copied: "Gekopieerd!",
                                        accept_terms: "Accepteren",
                                        dismiss_terms: "Sluiten",
                                        listening_status: "Luistert...",
                                        speaking_status: "Praat om te onderbreken",
                                        connecting_status: "Verbinden...",
                                        chatting_status: "Chat met Lisa",
                                        input_label: "Bericht",
                                        input_placeholder: "Typ een bericht...",
                                        input_placeholder_text_only: "Typ een bericht...",
                                        input_placeholder_new_conversation: "Start een nieuw gesprek...",
                                        user_ended_conversation: "Je hebt het gesprek beëindigd",
                                        agent_ended_conversation: "Lisa heeft het gesprek beëindigd",
                                        conversation_id: "Gesprek ID",
                                        error_occurred: "Er is een fout opgetreden",
                                        copy_id: "Kopieer ID",
                                        initiate_feedback: "Hoe was je ervaring?",
                                        request_follow_up_feedback: "Vertel ons meer",
                                        thanks_for_feedback: "Bedankt voor je feedback!",
                                        thanks_for_feedback_details: "Je feedback helpt ons verbeteren.",
                                        follow_up_feedback_placeholder: "Vertel ons wat we beter kunnen doen...",
                                        submit: "Verstuur",
                                        go_back: "Terug",
                                        send_message: "Verstuur",
                                        text_mode: "Tekst",
                                        voice_mode: "Spraak",
                                        switched_to_text_mode: "Overgeschakeld naar tekst",
                                        switched_to_voice_mode: "Overgeschakeld naar spraak",
                                        copy: "Kopieer",
                                        download: "Download",
                                        wrap: "Terugloop",
                                        agent_working: "Lisa is bezig...",
                                        agent_done: "Klaar",
                                        agent_error: "Er ging iets mis"
                              };

                              // 3. Voeg het widget element toe aan de pagina
                              const widget = document.createElement("elevenlabs-convai");
      widget.setAttribute("agent-id", "agent_3701kn76ex6sejdvqy0qvt6f59tw");
      widget.setAttribute("text-contents", JSON.stringify(nlTexts));
      document.body.appendChild(widget);

});

//-------------------------------------------------------------
// Newsletter Signup Handler
// Koppelt het formulier op /nieuwsbrief aan de n8n webhook
//-------------------------------------------------------------
(function () {
      function initNewsletter() {
                if (!window.location.pathname.includes("nieuwsbrief")) return;

          var form = document.querySelector("form");
                if (!form) return;

          var btn = form.querySelector('button[type="submit"]');
                var emailInput = document.getElementById("Email") || form.querySelector("input");

          btn.addEventListener("click", async function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        var email = emailInput.value.trim();

                                           if (!email) return;

                                           btn.textContent = "Bezig...";
                        btn.disabled = true;

                                           try {
                                                             var res = await fetch(
                                                                                   "https://n8n.in2ai.nl/webhook/newsletter-signup",
                                                               {
                                                                                         method: "POST",
                                                                                         headers: { "Content-Type": "application/json" },
                                                                                         body: JSON.stringify({ email: email, bron: "website" }),
                                                               }
                                                                               );
                                                             var data = await res.json();

                            emailInput.value = "";
                                                             btn.textContent = "Aangemeld!";
                                                             btn.style.backgroundColor = "#10b981";

                            setTimeout(function () {
                                                  btn.textContent = "Aanmelden";
                                                  btn.disabled = false;
                                                  btn.style.backgroundColor = "";
                            }, 3000);
                                           } catch (err) {
                                                             btn.textContent = "Fout, probeer opnieuw";
                                                             btn.disabled = false;
                                                             setTimeout(function () {
                                                                                   btn.textContent = "Aanmelden";
                                                             }, 3000);
                                           }
          }, true);

          form.addEventListener("submit", function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
          }, true);
      }

     if (document.readyState === "loading") {
               document.addEventListener("DOMContentLoaded", initNewsletter);
     } else {
               initNewsletter();
     }
})();
