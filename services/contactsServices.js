import Contact from "../models/Contacts.js";

export const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", query).populate(
    "owner",
    "name email"
  );

export const getContactById = (contactId) => Contact.findOne(contactId);

export const addContact = (data) => Contact.create(data);

export const updateContact = (id, body) => Contact.findOneAndUpdate(id, body);

export const removeContact = (contactId) => Contact.findOneAndDelete(contactId);

export const updateStatusContact = (id, data) =>
  Contact.findOneAndUpdate(id, data);
