(() => {
  'use strict';

  const KNOWN_FINGERPRINTS = new Set([
    '687488f2fcd75c70c472bb18386ac3e18525fb1cec80e62826e4857631be3829',
    'd1b6550bcd465e2e898653ebe0172efea5ac47860a1484baf3abb2dad0a1e5f5'
  ]);

  const normalizeReference = (value) => value.trim().toUpperCase();
  const validReferenceShape = (value) => /^SSC-[A-Z0-9-]{4,59}$/.test(value);

  async function sha256(value) {
    const encoded = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  function renderMessage(container, message, kind = 'plain', reference = '') {
    container.replaceChildren();

    if (kind === 'valid') {
      const card = document.createElement('div');
      card.className = 'verify-card valid';

      const title = document.createElement('div');
      title.className = 'verify-title';
      title.textContent = '✓ Valid credential';

      const ref = document.createElement('div');
      ref.className = 'verify-ref';
      ref.textContent = `Reference: ${reference}`;

      const detail = document.createElement('div');
      detail.className = 'verify-detail';
      detail.textContent = 'Credential verified as issued by SmaRTy Saini Corp.';

      card.append(title, ref, detail);
      container.append(card);
      return;
    }

    const note = document.createElement('div');
    note.className = kind === 'invalid' ? 'verify-message invalid' : 'verify-message';
    note.textContent = message;
    container.append(note);
  }

  async function verifyCredential(input, result) {
    const reference = normalizeReference(input.value);

    if (!reference) {
      renderMessage(result, 'Enter a certificate reference.');
      return;
    }

    if (reference.length > 63 || !validReferenceShape(reference)) {
      renderMessage(result, 'That certificate reference format is not valid.', 'invalid');
      return;
    }

    try {
      const fingerprint = await sha256(reference);
      if (KNOWN_FINGERPRINTS.has(fingerprint)) {
        renderMessage(result, '', 'valid', reference);
      } else {
        renderMessage(result, 'No matching credential reference was found.', 'invalid');
      }
    } catch {
      renderMessage(result, 'Verification is unavailable in this browser. Please use a current HTTPS-enabled browser.', 'invalid');
    }
  }

  const form = document.getElementById('credential-form');
  const input = document.getElementById('cert');
  const result = document.getElementById('verifyResult');

  if (!form || !input || !result) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    verifyCredential(input, result);
  });

  const queryReference = new URLSearchParams(window.location.search).get('id');
  if (queryReference && queryReference.length <= 63) {
    input.value = queryReference;
    verifyCredential(input, result);
  }
})();
