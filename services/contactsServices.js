import Contact  from "../models/Contacts.js";

export const listContacts = () => Contact.find({}, "-createdAt -updatedAt");

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = (data) => Contact.create(data);

export const updateContact = (id, body) => Contact.findByIdAndUpdate(id, body);

export const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

export const updateStatusContact = (id, data) => Contact.findByIdAndUpdate(id, data);