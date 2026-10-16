(function () {
  const cfg = window.EASTC_CONFIG;
  if (!cfg) return;

  const PLACEHOLDERS = new Set([
    "YOCO_PUBLIC_KEY",
    "YOCO_SECRET_KEY",
    "YOCO_PAYMENT_LINK_URL",
    "YOCO_CHECKOUT_ENDPOINT",
    "CONTACT_FORM_ENDPOINT",
    "WHATSAPP_NUMBER"
  ]);

  function isPlaceholder(value) {
    if (value == null) return true;
    const v = String(value).trim();
    if (!v) return true;
    if (PLACEHOLDERS.has(v)) return true;
    if (/^\[.*to be confirmed\]$/i.test(v)) return true;
    return false;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function paragraphs(lines) {
    return lines.map((line) => "<p>" + escapeHtml(line) + "</p>").join("");
  }

  function entityId() {
    const fromBody = document.body.dataset.entity;
    if (fromBody && cfg.entities[fromBody]) return fromBody;
    const part = location.pathname.split("/").filter(Boolean)[0];
    if (cfg.entities[part]) return part;
    return "holdings";
  }

  function sharedBase() {
    if (document.body.dataset.shared) return document.body.dataset.shared.replace(/\/$/, "");
    const part = location.pathname.split("/").filter(Boolean)[0];
    if (part === "technical-school" || part === "artisanal-college" || part === "eastc-varsity") return "../shared";
    return "shared";
  }

  function mediaUrl(image) {
    if (!image) return "";
    if (/^(https?:|data:|\/)/.test(image)) return image;
    if (image.includes("/")) return image;
    return sharedBase() + "/img/" + image;
  }

  function leaderAlt(person) {
    if (isPlaceholder(person.name) || /placeholder/i.test(person.image || "")) {
      return "Placeholder image for the " + person.role + ". Not a photograph of a person.";
    }
    return "Photo of " + person.name + ", " + person.role;
  }

  function renderLeadership() {
    document.querySelectorAll("[data-leader-grid]").forEach((mount) => {
      const entity = cfg.entities[entityId()];
      const people = [
        cfg.leadership.ceo,
        (entity && entity.managingDirector) || cfg.leadership.managingDirector
      ];
      mount.innerHTML = people.map((person) => {
        const name = isPlaceholder(person.name) ? person.name : person.name;
        const title = person.title;
        return (
          '<article class="leader-card">' +
            '<img src="' + escapeHtml(mediaUrl(person.image)) + '" alt="' + escapeHtml(leaderAlt(person)) + '">' +
            '<div class="card-body">' +
              '<span class="placeholder-flag">Placeholder</span>' +
              '<h3>' + escapeHtml(person.role) + '</h3>' +
              '<p class="leader-name">' + escapeHtml(name) + '</p>' +
              '<p>' + escapeHtml(title) + '</p>' +
              '<p class="note">Swap the name, title, and image for this seat in shared/config.js.</p>' +
            '</div>' +
          '</article>'
        );
      }).join("");
    });
  }

  function renderFacts() {
    const entity = cfg.entities[entityId()];
    if (!entity) return;
    document.querySelectorAll("[data-fact-grid]").forEach((mount) => {
      const cards = [
        { title: "Course availability", lines: entity.courses },
        { title: "Student accommodation", lines: cfg.accommodation },
        { title: "Accreditation", lines: cfg.accreditation }
      ];
      mount.innerHTML = cards.map((card) => {
        return (
          '<article class="fact-card">' +
            '<h3>' + escapeHtml(card.title) + '</h3>' +
            paragraphs(card.lines) +
          '</article>'
        );
      }).join("");
    });
  }

  function activeEntity() {
    return cfg.entities[entityId()] || cfg.entities.holdings;
  }

  function activeContact() {
    const over = activeEntity().contact;
    return over ? Object.assign({}, cfg.contact, over) : cfg.contact;
  }

  function activeEft() {
    return activeEntity().eft || cfg.eft;
  }

  function renderDirectory() {
    const mount = document.querySelector("[data-directory]");
    if (!mount) return;
    const campus = activeContact();
    mount.innerHTML = cfg.departments.map((dept) => {
      return (
        '<article class="dept-card">' +
          '<h3>' + escapeHtml(dept.name) + '</h3>' +
          '<span class="placeholder-flag">Placeholder</span>' +
          '<p>Person: ' + escapeHtml(dept.person) + '</p>' +
          '<p>Email: ' + escapeHtml(dept.email) + '</p>' +
          '<p>Direct phone: ' + escapeHtml(dept.phone) + '</p>' +
          '<p>A direct line for this department is to be confirmed. The campus contacts below are the published numbers.</p>' +
          '<p><a href="tel:' + escapeHtml(campus.phoneTel) + '">' + escapeHtml(campus.phoneDisplay) + '</a></p>' +
          (campus.mobileDisplay ? '<p><a href="tel:' + escapeHtml(campus.mobileTel) + '">' + escapeHtml(campus.mobileDisplay) + '</a></p>' : "") +
          '<p><a href="mailto:' + escapeHtml(campus.email) + '">' + escapeHtml(campus.email) + '</a></p>' +
        '</article>'
      );
    }).join("");
  }

  function renderFunding() {
    document.querySelectorAll("[data-funding]").forEach((mount) => {
      mount.innerHTML = cfg.funding.map((item) => {
        return (
          '<a class="funding-card" href="' + escapeHtml(item.href) + '" target="_blank" rel="noopener noreferrer">' +
            '<h3>' + escapeHtml(item.name) + '</h3>' +
            '<p>' + escapeHtml(item.detail) + '</p>' +
          '</a>'
        );
      }).join("");
    });
  }

  function renderEft() {
    const mount = document.querySelector("[data-eft]");
    if (!mount) return;
    const eft = activeEft();
    const published = eft.published === true;
    const rows = [
      ["Bank", eft.bankName],
      ["Branch", eft.branchName],
      ["Account name", eft.accountName],
      ["Account number", eft.accountNumber],
      ["Branch code", eft.branchCode],
      ["Account type", eft.accountType]
    ].filter((row) => row[1] && (!published || !isPlaceholder(row[1])));
    const intro = published
      ? eft.source
      : "These fields are empty on purpose. Real bank details are not published for this entity.";
    mount.innerHTML =
      (published ? "" : '<span class="placeholder-flag">Placeholder</span>') +
      '<h3>EFT banking details</h3>' +
      '<p>' + escapeHtml(intro) + '</p>' +
      '<ul class="eft-list">' +
        rows.map((row) => "<li><span>" + escapeHtml(row[0]) + "</span><strong>" + escapeHtml(row[1]) + "</strong></li>").join("") +
      "</ul>" +
      "<p>Reference: " + escapeHtml(eft.referenceHelp) + "</p>";
  }

  function renderFees() {
    const fees = activeEntity().fees;
    if (!fees) return;
    const html =
      '<div class="table-wrap"><table><thead><tr><th>Item</th><th>Amount</th><th>When</th></tr></thead><tbody>' +
      fees.map((fee) => "<tr><td><strong>" + escapeHtml(fee.label) + "</strong></td><td>" + escapeHtml(fee.amount) + "</td><td>" + escapeHtml(fee.note) + "</td></tr>").join("") +
      "</tbody></table></div>";
    document.querySelectorAll("[data-fee-table]").forEach((el) => { el.innerHTML = html; });
  }

  function pageUrl(status) {
    const url = new URL(location.href);
    url.search = "";
    url.hash = "";
    if (status) url.searchParams.set("status", status);
    return url.toString();
  }

  function toCents(raw) {
    const value = String(raw).trim().replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(value)) return null;
    const parts = value.split(".");
    const cents = ((parts[1] || "") + "00").slice(0, 2);
    return Number(parts[0]) * 100 + Number(cents);
  }

  function paymentReady() {
    const pay = cfg.payments;
    return !isPlaceholder(pay.yocoCheckoutEndpoint) || !isPlaceholder(pay.yocoPaymentLinkUrl);
  }

  function modeCopy() {
    const pay = cfg.payments;
    if (pay.testMode && !paymentReady()) {
      return "Test mode is on. No payment is sent until a Yoco test payment link or a checkout endpoint is saved in shared/config.js.";
    }
    if (pay.testMode) {
      return "Test mode is on. Use a Yoco test payment link, or a server that calls Yoco with a test secret key. A live payment link still charges a real card.";
    }
    return "Live mode is on in shared/config.js. A completed return to this page still needs the campus to confirm the payment.";
  }

  function secretWarning() {
    if (!isPlaceholder(cfg.payments.yocoSecretKey)) {
      return " A Yoco secret is sitting in the public config. Move it to the server. This page leaves it unused.";
    }
    return "";
  }

  function fillMode() {
    document.querySelectorAll("[data-pay-mode]").forEach((el) => {
      el.textContent = modeCopy() + secretWarning();
    });
  }

  function buildPaymentLink(amountCents, amountRand, reference) {
    const template = cfg.payments.yocoPaymentLinkUrl;
    let url = template
      .replaceAll("{amountCents}", String(amountCents))
      .replaceAll("{amount}", amountRand)
      .replaceAll("{reference}", encodeURIComponent(reference));
    return url;
  }

  function showStatus(form, message) {
    const note = form.querySelector("[data-pay-status]");
    if (!note) return;
    note.textContent = message;
    note.classList.add("show");
  }

  function rememberReference(reference) {
    try { sessionStorage.setItem("eastc-fee-reference", reference); } catch (err) { /* ignore */ }
  }

  function initPayForm() {
    const form = document.querySelector("#pay-fees");
    if (!form) return;
    fillMode();
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    let stored = "";
    try { stored = sessionStorage.getItem("eastc-fee-reference") || ""; } catch (err) { stored = ""; }
    if (status === "success") {
      showStatus(form, "Yoco returned you to this page" + (stored ? " for reference " + stored : "") + ". The campus confirms the fee separately. Automatic confirmation is to be confirmed.");
    } else if (status === "cancel") {
      showStatus(form, "The payment page was closed before payment. You can send it again.");
    } else if (status === "failure") {
      showStatus(form, "The payment page reported that it did not finish. You can try again.");
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const amountInput = form.querySelector("#fee-amount");
      const referenceInput = form.querySelector("#fee-reference");
      const reference = referenceInput.value.trim();
      const cents = toCents(amountInput.value);
      if (!reference || reference.length > 64) {
        showStatus(form, "Enter a student number or invoice.");
        referenceInput.focus();
        return;
      }
      if (cents == null || cents < cfg.payments.minRand * 100) {
        showStatus(form, "Enter an amount of at least R" + cfg.payments.minRand + ".00. Yoco does not take a payment under R2.");
        amountInput.focus();
        return;
      }
      rememberReference(reference);
      const amountRand = (cents / 100).toFixed(2);
      const pay = cfg.payments;
      const payload = {
        testMode: pay.testMode === true,
        amount: cents,
        currency: pay.currency,
        reference: reference,
        itemName: pay.itemName,
        entity: entityId(),
        successUrl: pageUrl("success"),
        cancelUrl: pageUrl("cancel"),
        failureUrl: pageUrl("failure")
      };

      if (!isPlaceholder(pay.yocoCheckoutEndpoint)) {
        try {
          const response = await fetch(pay.yocoCheckoutEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(payload)
          });
          const data = await response.json().catch(() => ({}));
          if (response.ok && data && typeof data.redirectUrl === "string" && /^https:\/\//.test(data.redirectUrl)) {
            location.assign(data.redirectUrl);
            return;
          }
          const reason = data && (data.message || data.error) ? " " + (data.message || data.error) : "";
          showStatus(form, "The Yoco checkout did not start." + reason);
        } catch (err) {
          showStatus(form, "The Yoco checkout endpoint could not be reached. Nothing was paid.");
        }
        if (!isPlaceholder(pay.yocoPaymentLinkUrl)) {
          const link = buildPaymentLink(cents, amountRand, reference);
          showStatus(form, form.querySelector("[data-pay-status]").textContent + " You can continue with the Yoco payment link.");
          const go = document.createElement("a");
          go.className = "btn btn-navy";
          go.href = link;
          go.textContent = "Continue to Yoco";
          go.style.marginTop = "8px";
          form.querySelector("[data-pay-status]").appendChild(document.createElement("br"));
          form.querySelector("[data-pay-status]").appendChild(go);
        }
        return;
      }

      if (!isPlaceholder(pay.yocoPaymentLinkUrl)) {
        location.assign(buildPaymentLink(cents, amountRand, reference));
        return;
      }

      showStatus(form, modeCopy() + " Nothing was sent. Reference " + reference + " for R" + amountRand + " stays on this page.");
    });
  }

  function initContactForm() {
    const form = document.querySelector("#staff-contact");
    if (!form) return;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const note = form.querySelector("[data-contact-status]");
      const data = {
        name: form.querySelector("#contact-name").value.trim(),
        email: form.querySelector("#contact-email").value.trim(),
        department: form.querySelector("#contact-department").value,
        message: form.querySelector("#contact-message").value.trim(),
        entity: entityId()
      };
      const campus = activeContact();
      const endpoint = campus.endpoint;
      const mailto = campus.mailto;
      const subject = "Staff contact: " + data.department + " (" + (cfg.entities[data.entity] || {}).name + ")";
      const body = "Name: " + data.name + "\nEmail: " + data.email + "\nDepartment: " + data.department + "\n\n" + data.message;

      function openMail() {
        if (note) {
          note.textContent = "Your email app opens a message to " + mailto + ". That is the published campus address.";
          note.classList.add("show");
        }
        location.href = "mailto:" + mailto + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      }

      if (isPlaceholder(endpoint)) {
        openMail();
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("status");
        if (note) {
          note.textContent = "Message sent to the campus endpoint.";
          note.classList.add("show");
        }
        form.reset();
      } catch (err) {
        openMail();
      }
    });
  }

  function initFloat() {
    if (document.querySelector(".float-contact")) return;
    const wrap = document.createElement("div");
    wrap.className = "float-contact";
    const campus = activeContact();
    const call = document.createElement("a");
    call.className = "float-btn float-call";
    call.href = "tel:" + campus.phoneTel;
    call.textContent = "Call " + campus.phoneDisplay;
    const wa = document.createElement("a");
    wa.className = "float-btn float-wa";
    const number = String(campus.whatsappNumber || "").replace(/[^\d]/g, "");
    const staffHref = (document.body.dataset.shared === "shared" ? "" : "") + "contact-staff.html#whatsapp";
    if (isPlaceholder(campus.whatsappNumber) || number.length < 10) {
      wa.classList.add("is-placeholder");
      wa.href = staffHref;
      wa.textContent = "WhatsApp — to be confirmed";
    } else {
      const intl = number.startsWith("0") ? "27" + number.slice(1) : number;
      wa.href = "https://wa.me/" + intl;
      wa.target = "_blank";
      wa.rel = "noopener noreferrer";
      wa.textContent = "WhatsApp";
    }
    wrap.appendChild(call);
    wrap.appendChild(wa);
    document.body.appendChild(wrap);
  }

  renderLeadership();
  renderFacts();
  renderDirectory();
  renderFunding();
  renderEft();
  renderFees();
  initPayForm();
  initContactForm();
  initFloat();
})();
