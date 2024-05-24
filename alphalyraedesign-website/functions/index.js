/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addClient = onRequest(async (request, response) => {
  const {clientId, codiceFiscale, name, surname, invoices, address,
    country, partitaIVA, email, phone, notes} = request.body;
  try {
    const docRef = await db.collection("clienti").add({
      address,
      clientId,
      codiceFiscale,
      country,
      email,
      invoices,
      name,
      notes,
      partitaIVA,
      phone,
      surname,
    });
    response.status(200).json({id: docRef.id});
  } catch (error) {
    response.status(500).json({error: "Error adding client"});
  }
});
