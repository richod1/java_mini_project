const createCRUDController=require("../../middlewaresControllers/createCRUDController")
const methods=createCRUDController('Offer');

const create=require("./create")
const summary=require("./summary")
const update=require("./update");
const read=require("./read")
const sendMail=require("./sendMail")
const paginatedList=require("./paginatedList")

methode.list=paginatedList;
methods.read=read;
methods.mail=sendMail;
methods.update=update;
methods.summary=summary;
methods.create=create;

module.exports=methods;




