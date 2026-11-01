function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Missing request body.');
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var required = ['fullName', 'email', 'whatsapp', 'businessName'];
    required.forEach(function (field) {
      if (!data[field] || String(data[field]).trim() === '') {
        throw new Error('Missing required field: ' + field);
      }
    });

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName,
      data.email,
      data.whatsapp,
      data.businessName,
      data.website || '',
      data.message || '',
      data.source || 'landing-page',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message || 'Unknown error' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
