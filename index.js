const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "addEmployee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payEmployees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddress",
				"type": "address"
			}
		],
		"name": "removeEmployee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "newSalary",
				"type": "uint256"
			}
		],
		"name": "updateSalary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "employees",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalSalaries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalSalaries",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "salaries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x7800cEE42bBc3BeA1B4919FAB85c6BfEf1E8A324";

let web3;
let contract;

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum); // No need to import
        await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
        document.getElementById("status").innerText = "Connected to Ethereum!";
    } else {
        document.getElementById("status").innerText = "Please install MetaMask!";
    }
};


// Add employee
async function addEmployee() {
    const address = document.getElementById("employeeAddress").value;
    const salary = document.getElementById("employeeSalary").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addEmployee(address, salary).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Employee added successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Failed to add employee.";
    }
}

// Update employee salary
async function updateEmployeeSalary() {
    const address = document.getElementById("updateEmployeeAddress").value;
    const newSalary = document.getElementById("newEmployeeSalary").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateSalary(address, newSalary).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Salary updated successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Failed to update salary.";
    }
}

// Remove employee
async function removeEmployee() {
    const address = document.getElementById("removeEmployeeAddress").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.removeEmployee(address).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Employee removed successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Failed to remove employee.";
    }
}

// Pay employees
async function payEmployees() {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.payEmployees().send({ from: accounts[0] });
        document.getElementById("status").innerText = "Salaries paid successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Failed to pay employees.";
    }
}
