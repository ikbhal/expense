<script>
import {onMount} from 'svelte';
//https://svelte.dev/tutorial/writable-stores
import {writable} from 'svelte/store';

import {db} from './firebase';
let todayDateString = new Date().toISOString().slice(0,10);
export let expenseDate= todayDateString;
export let expenseFor = '';
export let amount = 0;

export let expenseList=writable([]);

async function loadExpenseList(){
	let expensesRef = db.collection('expenses');
  	let allExpenses= await expensesRef.get();
	let expenseListCopy = [];
	for(const doc of allExpenses.docs){
		let docData = doc.data();
		let expenseCopy = {
			id:doc.id, 
			expenseDate:docData.expenseDate,
			amount: docData.amount,
			expenseFor:docData.expenseFor,// expense for whom 
		};
		expenseListCopy.push(expenseCopy);
   		console.log(doc.id, '=>', doc.data());
  	}
	expenseList.set(expenseListCopy);
}

onMount(async () => {
	loadExpenseList();
});

function handleOnSubmit() {
	console.log("form submitted");
	db.collection("expenses").add({
	    expenseDate,	
		amount,
		expenseFor
	})
	.then(() => {
		console.log("Document successfully written!");
		loadExpenseList();
	})
	.catch((error) => {
		console.error("Error writing document: ", error);
	});
}

function deleteExpense(id){
	console.log("remove bath id:", id);
	db.collection("expense").doc(id).delete().then(() => {
		console.log("Document successfully deleted!");
		loadExpenseList();
	}).catch((error) => {
		console.error("Error removing document: ", error);
	});
}

</script>

<main>
<h1>Expense</h1>
<p>Add - List - Total</p>
<hr/>
<div class="expsense_form">
	<form on:submit|preventDefault={handleOnSubmit}>
		Expense Date:<input type="date" bind:value={expenseDate}/>
		<input type="number" name="amount" bind:value={amount} placeholder="amount" />
		<input type="text" name="expenseFor" bind:value={expenseFor} placeholder="expense for"/>
		<button type="submit" >Add</button>
	</form>
</div>
<hr/>
<h3>List Expense</h3>
<div class="expenseList">
	{#each $expenseList as expense}
		<div>
			<span class="expense_date">{expense.expenseDate}: </span>
			<span class="expense_amount">{expense.amount} </span> 
			for <span class="expense_for">{expense.expenseFor}</span>
			<button on:click={deleteExpense(expense.id)}>Delete</button>
		</div>
	{/each}
</div>
</main>

<style>
</style>