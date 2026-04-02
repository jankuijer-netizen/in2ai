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

                            // 2. Voeg het widget element toe aan de pagina
                            const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", "agent_3701kn76ex6sejdvqy0qvt6f59tw");
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

      // Intercept button click (Hostinger uses click, not form submit)
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
