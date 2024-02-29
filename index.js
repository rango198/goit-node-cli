import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const delContact = await removeContact(id);
      console.log(delContact);
      break;

    case "edit":
      const editContact = await updateContact(id, { name, email, phone });
      console.table(editContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
