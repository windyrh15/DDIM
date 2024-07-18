let queryString = window.location.search;
let params = new URLSearchParams(queryString);

let page = params.get("page");

const token = 'DpacnJf3uEQeM7HN';

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

const headerFormData = {
  'Authorization': `Bearer ${token}`
};

const baseUrl = 'https://apiddim.booq.id';

let sales = "sales";
let dataUser = `${baseUrl}/data/sales/user`;
let dataType = `${baseUrl}/data/sales/type`;
let dataStatus = `${baseUrl}/data/sales/status`;
let salesData = `${baseUrl}/sales`;
let salesFile = `${baseUrl}/ddim/calculation/file`;
let salesDelete = `${baseUrl}/delete/sales`;
let salesStatusUpdate = `${baseUrl}/update/status/sales`;
let dataBarChart = `${baseUrl}/data/sales/recapchart`;
let mpData = `${baseUrl}/data/sales/recap`;
let dataTotalMp = `${baseUrl}/data/sales/recaptotal`;
let dataLastNumber = `${baseUrl}/data/sales/lastnumber`;
let detailSales = `${baseUrl}/detail/sales/summary`;
let clientData = `${baseUrl}/data/sales/client`;

let project = "project";
let projectData = `${baseUrl}/project`;
let dataPm = `${baseUrl}/manager/project`;
let editPm = `${baseUrl}/update/manager/project`;
let vendorProjectData = `${baseUrl}/vendor/project`;
let projectName = `${baseUrl}/won/project`;
let dataBranch = "/branch.json";
let uploadFolderProject = `${baseUrl}/folder/project`;
let editFolderProject = `${baseUrl}/update/folder/project`;
let uploadFileProject = `${baseUrl}/file/project`;
let deleteFileProject = `${baseUrl}/delete/file/project`;
let getFolderProject = `${baseUrl}/document/project`;
let getFileProject = `${baseUrl}/doc/project/file`;
let cancelProject = `${baseUrl}/cancel/project`;
let delProject = `${baseUrl}/delete/project`;
let finishProject = `${baseUrl}/update/status/project`;

let finance = "finance";
let financeData = `${baseUrl}/finance`;
let accountFinance = `${baseUrl}/account/finance`;
let categoryFinance = `${baseUrl}/transaction/category/finance`;
let cashflowFinance = `${baseUrl}/cashflow/finance`;
let projectExpenses = `${baseUrl}/project/expenses`;

let admin = "admin";
let getVendor = `${baseUrl}/vendor`;
let purchaseOrder = `${baseUrl}/purchase/order`;
let lastNumberPo =`${baseUrl}/lastnumber/purchase/order`;

let getClient = "api/admin/client.json";
let getEmployee = "api/admin/employee.json";

let letterCode = `${baseUrl}/letter/code`;
let lastNumberLetter =`${baseUrl}/lastnumber/official/letter`;
let addLetter =`${baseUrl}/add/letter`;
let letterData =`${baseUrl}/data/letter`;
let letterDelete =`${baseUrl}/delete/letter`;
let letterUpdate =`${baseUrl}/update/letter`;

let letterGetDoc = `${baseUrl}/document/letter`;

let letterAddFolder = `${baseUrl}/folder/letter`;
let letterUpdateFolder = `${baseUrl}/update/folder/letter`
let letterAddFile = `${baseUrl}/file/letter`;

let deliveryNote = `${baseUrl}/delivery/note/`;
let picData = `${baseUrl}/data/pic`;
let addDeliveryNote = `${baseUrl}/delivery/note/`;
let updateDeliveryNote = `${baseUrl}/update/delivery/note/`;
let deleteDeliveryNote = `${baseUrl}/delete/delivery/note/`;
let lastNumberDelivery = `${baseUrl}/lastnumber/delivery/note`;

let bgData = `${baseUrl}/bank/guarantee`;
let bgSummary = `${baseUrl}/summary/bank/guarantee`;
let bgInput = `${baseUrl}/bank/guarantee`;
let bgDelete = `${baseUrl}/delete/bank/guarantee`;
let bgUpdate = `${baseUrl}/update/bank/guarantee`;
let bgStatusUpdate = `${baseUrl}/update/status/bank/guarantee`;
let bgFile = `${baseUrl}/file/bank/guarantee`;