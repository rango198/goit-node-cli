import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  let allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return `Contact with id ${id} does not exist.`;
  }
  const [removedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return `Contact '${removedContact.name}' has been successfully removed.`;
};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (id, data) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
